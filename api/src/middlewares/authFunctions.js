function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log(req.user);
      res.status(400).json({message: "You are not authenticated"});
    }
}

module.exports = { ensureAuthenticated }