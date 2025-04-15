const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/', forumController.getForum);
router.get('/filters', forumController.getFilters); // 🔥 
router.get('/:threadId', forumController.getForumOnClick);
router.post('/:threadId/answers', forumController.postAnswer);
router.post("/:threadId/answers/:answerId/vote", forumController.handleVoteAnswer);
router.post('/uploadForum', forumController.uploadForum);
module.exports = router;
