//Install npm i passport, npm i express-session, npm i passport-github2

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json('You do not have access.');
  }
  next();
};

module.exports = {
  isAuthenticated,
};
