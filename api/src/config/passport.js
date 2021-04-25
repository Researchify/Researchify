const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email}).then(user => {
            if (!user) return done(null, false, { message: 'That email is not registered' });

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === false) {
                    return done(null, false, { message: 'Password incorrect' });
                }
                return done(null, user);
            });
        })
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};