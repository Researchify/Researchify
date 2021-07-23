const jwt = require('jsonwebtoken');

const { aceessTokenExpiry, accessTokenCookieExpiry } = require('../config/tokenExpiry');

const cookieJwtAuth = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) return res.status(403).json('User not authenicated.') // access token does not exist

    try{
        const team = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN || "JWT_SECRET_ACCESS_TOKEN");
        req.team = team;
        next();
    } catch (error){ // access token expire 
        console.log('access token expired')
        // clear the expired access token 
        res.clearCookie('accessToken')

        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(403).json('User not authenicated. ')

        try{
            // verfiy the refresh token 
            const team = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN || "JWT_SECRET_REFRESH_TOKEN");

            delete team.createdAt
            delete team.updatedAt
            delete team.__v
            delete team.iat
            delete team.exp

            console.log(team)

            // re-gernerate the accessToken 
            const accessToken = jwt.sign(team, process.env.JWT_SECRET_ACCESS_TOKEN || "JWT_SECRET_ACCESS_TOKEN", {
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
            return res.status(403).json('Both tokens expire, please login in again. ');
        }
    }


    // jwt.verify(accessToken, process.env.JWT_SECRET_1 || "JWT_SECRET_1", (err, team) => { // why the team is contained in jwt token?? 
    //     console.log("verifying ")
    //     if (err) return res.sendStatus(403) // token is no longer valid
    //     req.team =  team
    //     console.log("!!!", team)
    //     next()
    // })
}

module.exports = { cookieJwtAuth };