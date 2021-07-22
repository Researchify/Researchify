const jwt = require('jsonwebtoken');

const cookieJwtAuth = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (accessToken == null) return res.sendStatus(401)
    //const refreshToken = req.cookies.refreshToken

    try{
        const team = jwt.verify(accessToken, process.env.JWT_SECRET_1 || "JWT_SECRET_1");
        req.team = team;
        next();
    } catch (error){
        res.clearCookie('accessToken')
        return res.redirect('/')
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