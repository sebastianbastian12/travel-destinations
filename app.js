const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const PORT = process.env.PORT || 3012;
const mongodbDestinations = require('./data/database.destinations');
const mongodbAirlines = require('./data/database.airlines');
const mongodbDestinationPlans = require('./data/database.destinationPlans');
const mongodbClients = require('./data/database.clients');

const swaggerMainFile = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerMainFile));

app.use(
  cors({
    origin: 'http://localhost:3010',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

/*app.get('/', (req, res) => {
  res.send('Welcome to the Travel Destinations || API');
});*/

app.use('/', require('./routes/index'));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findOrCreate({githubid: profile.id}, function (err, user){
      return done(null, profile);
      //});
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged Out'
  );
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

const initializeDatabases = async () => {
  try {
    await new Promise((resolve, reject) => {
      mongodbDestinations.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Destinations database initialized');

    await new Promise((resolve, reject) => {
      mongodbAirlines.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Airlines database initialized');

    await new Promise((resolve, reject) => {
      mongodbDestinationPlans.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Destination plans database initialized');

    await new Promise((resolve, reject) => {
      mongodbClients.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Clients database initialized');
  } catch (error) {
    console.error('Error initializing databases', error);
    process.exit(1);
  }
};

initializeDatabases().then(() => {
  app.listen(PORT, () => {
    console.log(`Web server working on port || ${PORT}`);
  });
});
