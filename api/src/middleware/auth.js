/**
 * This module contains auth middleware.
 */
const jwt = require('jsonwebtoken');

const { accessTokenExpiry, accessTokenCookieExpiry } = require('../config/tokenExpiry');
const { fillErrorObject } = require('./error');

const cookieJwtAuth = (req, res, next) => {
  const { accessToken } = req.cookies;
  // return error if access token does not exist
  if (!accessToken) {
    return next(
      fillErrorObject(403, 'Authorization error', [
        'User not authorized: Please login again']),
    );
  }

  try {
    const { team } = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN || 'JWT_SECRET_ACCESS_TOKEN');
    req.team = team;
    return next();
  } catch (error) { // access token expire
    // clear the expired access token
    res.clearCookie('accessToken');

    const { refreshToken } = req.cookies;
    // return error if refresh token does not exist
    if (!refreshToken) {
      return next(
        fillErrorObject(403, 'Authorization error', [
          'User not authorized: Please login again']),
      );
    }
    try {
      // verfiy the refresh token
      const { team } = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN || 'JWT_SECRET_REFRESH_TOKEN');

      // re-generate the accessToken
      const newAccessToken = jwt.sign({ team }, process.env.JWT_SECRET_ACCESS_TOKEN || 'JWT_SECRET_ACCESS_TOKEN', {
        expiresIn: accessTokenExpiry,
      });
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: accessTokenCookieExpiry,
      });
      req.team = team;
      return next();
    } catch (err) { // both access and refresh token expire
      res.clearCookie('refreshToken');
      res.clearCookie('isLogin');
      return next(
        fillErrorObject(403, 'Authorization error', [
          'User not authorized: Please login again']),
      );
    }
  }
};

module.exports = { cookieJwtAuth };
