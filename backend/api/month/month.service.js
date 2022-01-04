const ObjectId = require('mongodb').ObjectId
const accountService = require('../account/account.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('month')
        const months = await collection.find(criteria).toArray()
        return months
    } catch (err) {
        logger.error('cannot find months', err)
        throw err
    }
}

async function getById(monthId) {
    try {
        const collection = await dbService.getCollection('month')
        return await collection.findOne({ _id: ObjectId(monthId) })
    } catch (err) {
        logger.error('cannot find month', err)
        throw err
    }
}

async function remove(monthId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('month')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(monthId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove month ${monthId}`, err)
        throw err
    }
}

async function add(accountId, prevMonth, diff) {
    try {
        const monthToAdd = _createMonth(prevMonth, diff)
        const collection = await dbService.getCollection('month')
        let month = await collection.insertOne(monthToAdd)
        month = month.ops[0]
        accountService.addMonth(accountId, month, diff)
        return month;
    } catch (err) {
        logger.error('cannot insert month', err)
        throw err
    }
}

async function addCategory(monthId) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        const categoryToAdd = _createCategory()
        monthToSave.categories.unshift(categoryToAdd)
        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave;
    } catch (err) {
        logger.error('cannot insert category', err)
        throw err
    }
}

async function updateCategory(monthId, category) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        monthToSave.categories = monthToSave.categories.map(categ => categ.id === category.id ? category : categ)

        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave;
    } catch (err) {
        logger.error('cannot update category', err)
        throw err
    }
}

async function removeCategory(monthId, categoryId) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        monthToSave.categories = monthToSave.categories.filter(categ => categ.id !== categoryId)

        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave;
    } catch (err) {
        logger.error('cannot remove category', err)
        throw err
    }
}

async function addExpense(monthId, categoryId, expense) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        const expenseToAdd = _createExpense(expense)
        const categoryIdx = monthToSave.categories.findIndex(categ => categ.id === categoryId)
        monthToSave.categories[categoryIdx].expenses.push(expenseToAdd)
        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave;
    } catch (err) {
        logger.error('cannot insert month', err)
        throw err
    }
}

async function updateExpense(monthId, categoryId, expenseToSave) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        const categoryIdx = monthToSave.categories.findIndex(categ => categ.id === categoryId)
        monthToSave.categories[categoryIdx].expenses = monthToSave.categories[categoryIdx].expenses.map(expense => (expense.id === expenseToSave.id) ? expenseToSave : expense)

        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave;
    } catch (err) {
        logger.error('cannot update expense', err)
        throw err
    }
}

async function removeExpense(monthId, categoryId, expenseId) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        const categoryIdx = monthToSave.categories.findIndex(categ => categ.id === categoryId)
        monthToSave.categories[categoryIdx].expenses = monthToSave.categories[categoryIdx].expenses.filter(expense => expense.id !== expenseId)

        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave;
    } catch (err) {
        logger.error('cannot insert expense', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

function _createExpense({ description, sum }) {
    return {
        id: _makeId(),
        cratedAt: Date.now(),
        description,
        repeat: null,
        sum: {
            amount: sum || 0,
            currency: 'USA'
        },
        byUser: {
            _id: 'u101',
            username: 'hadas',
            imgUrl: '...'
        }
    }
}

function _createCategory() {
    return {
        id: _makeId(),
        title: "New Category",
        color: _getRandomColor(),
        description: "",
        expacted: 0,
        actual: 0,
        isIncome: false,
        expenses: []
    }
}

function _createMonth(prevMonth, diff) {
    const time = _getTime(prevMonth, diff)
    const categories = getCategories(prevMonth)
    return {
        time,
        members: prevMonth.members,
        categories
    }
}

function _getTime(prevMonth, diff) {
    let [month, year] = prevMonth.time.split('/')
    month = parseInt(month) + diff
    if (month > 12) {
        console.log('month bigger then 12');
        month = 1
        year = parseInt(year)++
    }
    else if (month < 1) {
        month = 12
        year = parseInt(year)--
    }
    if (month < 10) month = '0' + month

    console.log(`New month time: ${month}/${year} !!!`);
    return `${month}/${year}`
}

function getCategories(prevMonth) {
    return prevMonth.categories.map(categ => {
        categ.expenses = categ.expenses.filter((expense => expense.repeat))
        return categ
    })
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);

}

module.exports = {
    query,
    getById,
    remove,
    add,
    addCategory,
    updateCategory,
    removeCategory,
    addExpense,
    updateExpense,
    removeExpense
}


