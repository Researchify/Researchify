/**
 * This module defines the endpoints for the "/achievements" route and exports the corresponding Router.
 */

 const achievementsRouter = require('express').Router();

 const achievementsController = require('../controllers/achievements');
 
 achievementsRouter.post('/', achievementsController.createAchievement);
//  // achievementsRouter.get('/', achievementsController.getAchievements);
 achievementsRouter.delete('/:id', achievementsController.deleteAchievement);
 achievementsRouter.patch('/:id', achievementsController.updateAchievement);
 
 module.exports = achievementsRouter;
 