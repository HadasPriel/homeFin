const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { addMonth, getMonths, getMonth, deleteMonth, addExpense, updateExpense, deleteExpense, updateCategory, addCategory, deleteCategory } = require('./month.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getMonths)
router.get('/:id', log, getMonth)
router.post('/', log, addMonth)
router.put(`/:id/category`, log, updateCategory)
router.post('/:id/category', log, addCategory)
router.delete('/:id/category', log, deleteCategory)
router.put(`/:id/expense`, log, updateExpense)
router.post('/:id/expense', log, addExpense)
router.delete('/:id/expense', log, deleteExpense)
router.delete('/:id', deleteMonth)

module.exports = router