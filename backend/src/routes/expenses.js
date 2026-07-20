const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/expenseController');

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.get('/summary/monthly', ctrl.monthlySummary);
router.get('/summary/categories', ctrl.categorySummary);
router.get('/:id', ctrl.get);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
