const refreshTokenExpiryValue = 10080; // 7 days in minute 
const cookiesExpiryValue = refreshTokenExpiryValue

const accessTokenExpiry = '2s';
const refreshTokenExpiry = '10s'//refreshTokenExpiryValue.toString() + 'm';
const accessTokenCookieExpiry = cookiesExpiryValue * 600000;  
const refreshTokenCookieExpiry = cookiesExpiryValue * 600000; 

module.exports = { accessTokenExpiry, refreshTokenExpiry, accessTokenCookieExpiry, refreshTokenCookieExpiry }