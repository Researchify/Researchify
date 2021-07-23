const jwt = require('jsonwebtoken');

const { aceessTokenExpiry, accessTokenCookieExpiry } = require('../config/tokenExpiry');

const { fillErrorObject } = require('./error');

const cookieJwtAuth = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    // return error if access token does not exist
    if (!accessToken){ 
        next(
            fillErrorObject(
              403,
              'Authorization error',
              ['User not authorized: access token does not exist. ']
            )
        );
        return
    }

    try{
        const { team } = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN || "JWT_SECRET_ACCESS_TOKEN");
        req.team = team;
        console.log("!!!", team)
        next();
    } catch (error){ // access token expire 
        console.log('access token expired')
        // clear the expired access token 
        res.clearCookie('accessToken')

        const refreshToken = req.cookies.refreshToken
        // return error if refresh token does not exist
        if (!refreshToken){ 
            next(
                fillErrorObject( 403, 'Authorization error', ['User not authorized: refresh token does not exist'])
            );
            return
        }

        try{
            // verfiy the refresh token 
            const { team } = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN || "JWT_SECRET_REFRESH_TOKEN");

            console.log(team)

            // re-gernerate the accessToken 
            const accessToken = jwt.sign({ team: team }, process.env.JWT_SECRET_ACCESS_TOKEN || "JWT_SECRET_ACCESS_TOKEN", {
                expiresIn: aceessTokenExpiry
            });
            res.cookie('accessToken', accessToken, { 
                httpOnly: true,
                maxAge: accessTokenCookieExpiry, // 5 mins
              });
            req.team = team;
            next();
        } catch (error){ // both access and refresh token expire 
            res.clearCookie('refreshToken')
            res.clearCookie('isLogin')
            console.log('token clear')
            next(
                fillErrorObject(403, 'Authorization error', [
                    'User not authorized: Tokens expired, please login in again.',
                ])
            );
        }
    }
}

module.exports = { cookieJwtAuth };




// const jwt = require('jsonwebtoken');

// const { aceessTokenExpiry, accessTokenCookieExpiry } = require('../config/tokenExpiry');

// const { fillErrorObject } = require('./error');

// const cookieJwtAuth = (req, res, next) => {
//     const accessToken = req.cookies.accessToken

//     // return error if access token does not exist
//     if (!accessToken){ 
//         return next(
//             fillErrorObject(
//               403,
//               'Authorization error',
//               ['User not authorized: access token does not exist. ']
//             )
//         );
//     }

//     // verfiy access token 
//     jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN || "JWT_SECRET_ACCESS_TOKEN", (err, result1) => { 
//         if (err) { // access token expired/ does not match with jwt secret 
//             res.clearCookie('accessToken') 
//             const refreshToken = req.cookies.refreshToken

//             // return error if refresh token does not exist
//             if (!refreshToken){ 
//                 return next(
//                     fillErrorObject( 403, 'Authorization error', ['User not authorized: refresh token does not exist'])
//                 );
//             }
            
//             // verfiy refresh token
//             jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN || "JWT_SECRET_REFRESH_TOKEN", (err, result2) => { 
//                 if (err) { // refresh token expired/ does not match with jwt secret 
//                     res.clearCookie('refreshToken')
//                     res.clearCookie('isLogin')
//                     return next(
//                         fillErrorObject(403, 'Authorization error', [
//                           'User not authorized: Tokens expired, please login in again.',
//                         ])
//                     );
//                 }
//                 console.log("result2", result2)
//                 // refresh token verfication passes, re-gernerate the accessToken and pass the team object to the next function
//                 const accessToken = jwt.sign({ team: result2.team }, process.env.JWT_SECRET_ACCESS_TOKEN || "JWT_SECRET_ACCESS_TOKEN", {
//                     expiresIn: aceessTokenExpiry
//                 });
//                 res.cookie('accessToken', accessToken, { 
//                     httpOnly: true,
//                     maxAge: accessTokenCookieExpiry,
//                 });
//                 req.team = result2.team;
//                 next();
//             })
//         }
//         console.log("result1", result1)
//         // access token verfication passes, pass the team object to the next function 
//         req.team =  result1.team;
//         next();
//     })
// }

// module.exports = { cookieJwtAuth };