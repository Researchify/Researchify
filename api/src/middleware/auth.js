const jwt = require('jsonwebtoken');

const authorizeUser = (req, res, next) => {
    console.log(req.cookies)
    const accessToken = req.cookies.accessToken
    if (accessToken == null) return res.sendStatus(401)
    //const refreshToken = req.cookies.refreshToken


    jwt.verify(accessToken, process.env.JWT_SECRET_1 || "JWT_SECRET_1", (err, team) => { // why the team is contained in jwt token?? 
        console.log("verifying ")
        if (err) return res.sendStatus(403) // token is no longer valid
        req.team =  team
        console.log("!!!", team)
        next()
    })
}

module.exports = { authorizeUser };