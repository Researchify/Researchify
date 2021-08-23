// Note: both cookies expiry values should be the same or longer than the refresh token expiry
// whereas the access token expiry should be less than the above three.

const refreshTokenExpiryValue = 4320; // 3 days in minute
const cookiesExpiryValue = refreshTokenExpiryValue;

const accessTokenExpiry = '15m';
const refreshTokenExpiry = `${refreshTokenExpiryValue.toString()}m`;
const accessTokenCookieExpiry = cookiesExpiryValue * 600000;
const refreshTokenCookieExpiry = cookiesExpiryValue * 600000;

module.exports = {
  accessTokenExpiry,
  refreshTokenExpiry,
  accessTokenCookieExpiry,
  refreshTokenCookieExpiry,
};
