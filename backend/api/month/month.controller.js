const logger = require('../../services/logger.service')
// const userService = require('../user/user.service')
// const socketService = require('../../services/socket.service')
const monthService = require('./month.service')

async function getMonths(req, res) {
    try {
        const months = await monthService.query(req.query)
        res.send(months)
    } catch (err) {
        logger.error('Cannot get months', err)
        res.status(500).send({ err: 'Failed to get months' })
    }
}

async function getMonth(req, res) {
    const { id } = req.params
    try {
        const months = await monthService.getById(id)
        res.send(months)
    } catch (err) {
        logger.error('Cannot get months', err)
        res.status(500).send({ err: 'Failed to get months' })
    }
}

async function deleteMonth(req, res) {
    try {
        await monthService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete month', err)
        res.status(500).send({ err: 'Failed to delete month' })
    }
}

async function addMonth(req, res) {
    console.log('addMonth is running!');
    try {
        var { accountId, prevMonth, diff } = req.body
        month = await monthService.add(accountId, prevMonth, diff)
        res.send(month)
    } catch (err) {
        console.log(err)
        logger.error('Failed to add month', err)
        res.status(500).send({ err: 'Failed to add month' })
    }
}

async function addCategory(req, res) {
    try {
        month = await monthService.addCategory(req.params.id)
        res.send(month)
    } catch (err) {
        console.log(err)
        logger.error('Failed to add category', err)
        res.status(500).send({ err: 'Failed to add category' })
    }
}

async function deleteCategory(req, res) {
    try {
        const { categoryId } = req.body
        month = await monthService.removeCategory(req.params.id, categoryId)
        res.send(month)
    } catch (err) {
        console.log(err)
        logger.error('Failed to remove expense', err)
        res.status(500).send({ err: 'Failed to add expense' })
    }
}

async function updateCategory(req, res) {
    try {
        const { category } = req.body
        // month.byUserId = req.session.user._id
        month = await monthService.updateCategory(req.params.id, category)
        res.send(month)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add expense', err)
        res.status(500).send({ err: 'Failed to add expense' })
    }
}

async function addExpense(req, res) {
    try {
        const { categoryId, expense } = req.body
        // month.byUserId = req.session.user._id
        month = await monthService.addExpense(req.params.id, categoryId, expense)
        res.send(month)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add month', err)
        res.status(500).send({ err: 'Failed to add month' })
    }
}

async function updateExpense(req, res) {
    try {
        const { categoryId, expense } = req.body
        // month.byUserId = req.session.user._id
        month = await monthService.updateExpense(req.params.id, categoryId, expense)
        res.send(month)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add expense', err)
        res.status(500).send({ err: 'Failed to add expense' })
    }
}

async function deleteExpense(req, res) {
    try {
        const { categoryId, expenseId } = req.body
        month = await monthService.removeExpense(req.params.id, categoryId, expenseId)
        res.send(month)
    } catch (err) {
        console.log(err)
        logger.error('Failed to remove expense', err)
        res.status(500).send({ err: 'Failed to add expense' })
    }
}

module.exports = {
    getMonths,
    getMonth,
    deleteMonth,
    addMonth,
    addCategory,
    updateCategory,
    deleteCategory,
    addExpense,
    updateExpense,
    deleteExpense
}