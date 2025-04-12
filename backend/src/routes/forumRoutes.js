const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/forum/:threadId', forumController.getForumOnClick);
router.post('/forum/:threadId/answers', forumController.postAnswer);

module.exports = router;
