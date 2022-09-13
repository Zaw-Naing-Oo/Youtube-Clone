const router = require('express').Router();
const  { addVideo, updateVideo, deleteVideo, getVideo, addView, random, trend, sub, getByTags, search } = require('../controller/videos');
const { verifyToken } = require('../verifyToken');

router.post('/', verifyToken, addVideo)
router.put('/:id', verifyToken, updateVideo)
router.delete('/:id', verifyToken, deleteVideo)
router.get('/find/:id', getVideo)
router.put('/view/:id', addView)
router.get('/trend', trend)
router.get('/random', random)
router.get('/sub', verifyToken, sub)
router.get('/tags', getByTags)
router.get('/search', verifyToken, search )

module.exports = router;

