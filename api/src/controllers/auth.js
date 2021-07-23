const Team = require('../models/team.model');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { aceessTokenExpiry, refreshTokenExpiry, accessTokenCookieExpiry, refreshTokenCookieExpiry } = require('../config/tokenExpiry');

/**
 * Handle login request from /team/login
 * @param {*} req request object, containing team email and password in the body as JSON
 * @param {*} res response object, the found teamId
 * @returns 200: the team was found
 * @returns 404: team is not found
 */
 async function login(req, res) {
    try {
      const foundTeam = await Team.findOne({ email: req.body.email })
      if (!foundTeam) {
        return res.status(400).send('Incorrect email/password'); // user not found 
      } 
      if (await bcrypt.compare(req.body.password, foundTeam.password)){
        const teamObj = foundTeam.toObject(); // converts a mongoose object to a plain object 
        // remove sensitive data 
        delete teamObj.password 
        const accessToken = jwt.sign(teamObj, process.env.JWT_SECRET_ACCESS_TOKEN || "JWT_SECRET_ACCESS_TOKEN", {
          expiresIn: aceessTokenExpiry
        });
        const refreshToken = jwt.sign(teamObj, process.env.JWT_SECRET_REFRESH_TOKEN || "JWT_SECRET_REFRESH_TOKEN", {
          expiresIn: refreshTokenExpiry
        });
        res.cookie('accessToken', accessToken, { 
          httpOnly: true,
          maxAge: accessTokenCookieExpiry, // 5 mins
        });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: refreshTokenCookieExpiry, // 1 year
        })
        res.cookie('isLogin', true) // TODO: no expiration? 
        return res.status(200).send({
          teamId: teamObj._id, 
          email: teamObj.email,
          teamName: teamObj.teamName,
          orgName: teamObj.orgName
        });
      } 
      return res.status(403).send('Incorrect email/password'); // incorrect password 
    } catch (error){
      return res.status(422).json(`Error: ${error.message}`);
    }
  }


/**
 * Update the a logout request on /team/logout
 * @param {*} req request object
 * @param {*} res response object
 * @returns 200: logout successfully
 * @returns 404: error occur 
 */
 async function logout(req, res) {
    try{
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.clearCookie('isLogin')
    //   res.cookie('accessToken', "", { 
    //     httpOnly: true,
    //     maxAge: 0,
    //   });
    //   res.cookie('refreshToken', "", { 
    //     httpOnly: true,
    //     maxAge: 0,
    //   });
    //   res.cookie('isLogin', false, { 
    //     maxAge: 0,
    //   });
      res.status(200).json('Logout Successfully');
    } catch (error){
      return res.status(422).json(`Error: ${error.message}`);
    }
}

module.exports = {
    login,
    logout
};