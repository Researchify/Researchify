/**
 * @file This module contains handlers for the "auth" route.
 * @module auth
 */
const Team = require('../models/team.model');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { fillErrorObject } = require('../middleware/error');

const { accessTokenExpiry, refreshTokenExpiry, accessTokenCookieExpiry, refreshTokenCookieExpiry } = require('../config/tokenExpiry');

/**
 * Handle login request from /team/login
 * @param {*} req request object, containing team email and password in the body as JSON
 * @param {*} res response object, the found team object with properties of teamId, email, teamName and orgName
 * @returns 200: the team was found
 * @returns 400: team is not found
 */
 async function login(req, res, next) {
    const foundTeam = await Team.findOne({ email: req.body.email })
    if (!foundTeam) { // team not found 
      next(
        fillErrorObject(400, 'Authenication error', [
          'Incorrect email/password',
        ])
      );
    } 

    if (await bcrypt.compare(req.body.password, foundTeam.password)){
      const jwtPayload = {
        _id: foundTeam._id
      }

      const accessToken = jwt.sign({ team: jwtPayload }, process.env.JWT_SECRET_ACCESS_TOKEN || "JWT_SECRET_ACCESS_TOKEN", {
        expiresIn: accessTokenExpiry
      });
      const refreshToken = jwt.sign({ team: jwtPayload }, process.env.JWT_SECRET_REFRESH_TOKEN || "JWT_SECRET_REFRESH_TOKEN", {
        expiresIn: refreshTokenExpiry
      });

      res.cookie('accessToken', accessToken, { 
        httpOnly: true,
        maxAge: accessTokenCookieExpiry, 
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: refreshTokenCookieExpiry, 
      })
      res.cookie('isLogin', true, {
        maxAge: refreshTokenCookieExpiry,
      }) 
      return res.status(200).send(jwtPayload);
    } 

    // incorrect password 
    next(
      fillErrorObject(400, 'Authenication error', [
        'Incorrect email/password',
      ])
    ); 
  }


/**
 * Update the a logout request on /team/logout
 * @param {*} req request object
 * @param {*} res response object
 * @returns 200: logout successfully
 * @returns 404: error occur 
 */
function logout(req, res) {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.clearCookie('isLogin')
  res.status(200).json('Logout Successfully');
}

module.exports = {
    login,
    logout
};