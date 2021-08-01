const router = require('express').Router();
const auth = require('./auth');

const { registration, authenticate, getUser, updateUser, updatePhoto, logout } = require('../users');

//ADMIN
router.post('/users/registration', registration.fetchData, registration.saveToMongo, registration.uploadImage, registration.response);
router.post('/users/login', authenticate.fetchLoginDetails, authenticate.searchInMongo, authenticate.verifyUser, authenticate.createToken, authenticate.storeTokenInRedis, authenticate.addTokenToCookie, authenticate.response);
router.get('/users/:username', auth, getUser.fetchFromMongo, getUser.downloadPhoto, getUser.response);
router.patch('/users/update/:username', auth, updateUser.updateInMongo, updateUser.response);
router.get('/users/updatePhoto/:username', auth, updatePhoto.deleteOldImage, updatePhoto.uploadNewImage);
router.get('/private/users/logout', auth, logout.deleteTokens);

module.exports = router;