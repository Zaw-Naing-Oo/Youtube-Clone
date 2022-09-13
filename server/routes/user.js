const router = require('express').Router();
const { getUser, updateUser, deleteUser, subscribe, unSubscribe, like, disLike } = require('../controller/user');
const { verifyToken } = require('../verifyToken');

// get a  User ----> verifytoken
router.get('/find/:id', getUser)


// update User
router.put('/:id', verifyToken, updateUser);


// delete User
router.delete('/:id', verifyToken, deleteUser);


// subscribe
router.put('/sub/:id', verifyToken, subscribe);


// unSubscribe
router.put('/unsub/:id', verifyToken, unSubscribe);


// like a video
router.put('/like/:videoId', verifyToken, like);


// disLike a video
router.put('/disLike/:videoId', verifyToken, disLike);


module.exports = router