const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/', forumController.getForum);
router.get('/filters', forumController.getFilters); // 🔥 
router.get('/:threadId', forumController.getForumOnClick);
router.post('/:threadId/answers', forumController.postAnswer);

module.exports = router;
