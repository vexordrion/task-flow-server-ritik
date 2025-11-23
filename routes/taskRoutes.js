const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTask, getTasks, getTask, updateTask, deleteTask, getStats, searchtask } = require('../controllers/taskController');

// Protected task routes
router.use(auth);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/stats', getStats);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/search/:key',searchtask)

module.exports = router;
