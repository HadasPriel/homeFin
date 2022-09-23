const ObjectId = require('mongodb').ObjectId
const accountService = require('../account/account.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const asyncLocalStorage = require('../../services/als.service')
const utilService = require('../../services/util.service')

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

async function add(accountId, time, prevmonth, user) {
    try {
        const lastMonth = await _getLastMonth(accountId)
        const monthToAdd = _createMonth(time, lastMonth, user)
        const collection = await dbService.getCollection('month')
        let month = await collection.insertOne(monthToAdd)
        month = month.ops[0]
        accountService.addMonth(accountId, month)
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
        id: utilService.makeId(),
        cratedAt: new Date(),
        description,
        repeat: null,
        sum: {
            amount: sum || 0,
            currency: 'USA'
        },
        byUser: {
            _id: 'u101',
            username: 'hadas',
            imgUrl: 'https://res.cloudinary.com/dtg8d5gnc/image/upload/v1641632564/homeFin/profile1_qvcffx.jpg'
        }
    }
}

function _createCategory() {
    return {
        id: utilService.makeId(),
        title: "New Category",
        color: 'lb' + utilService.getRandomIntInclusive(1, 20),
        description: "",
        expected: 0,
        actual: 0,
        isIncome: false,
        expenses: []
    }
}
function _createIncomes() {
    return {
        id: utilService.makeId(),
        title: "Incomes",
        color: 'lb' + utilService.getRandomIntInclusive(1, 20),
        description: "",
        expected: 0,
        actual: 0,
        isIncome: true,
        expenses: []
    }
}

function _createMonth(time, prevMonth = null, user) {
    categories = _getCategories(prevMonth)

    return {
        time,
        members: prevMonth?.members || [user], //TODO: no need for members on month, its used on expense & acoount
        categories,
        incomes: prevMonth?.incomes || []
    }
}

function _getCategories(month) {
    if (!month || !month.categories) return [_createIncomes()]

    var isIncome = false
    var categsToReturn = month.categories.map(categ => {
        if (categ.isIncome) isIncome = true
        categ.expenses = categ.expenses.filter((expense => expense.repeat))
        return categ
    })

    if (!isIncome) { categsToReturn.push(_createIncomes()) }
    return categsToReturn
}


async function _getLastMonth(accountId) {
    const account = await accountService.getById(accountId)
    months = account.months

    const miniMinth = months.reduce((acc, currMonth) => {
        let [month, year] = currMonth.time.split('/')
        let [accMonth, accYear] = acc.time.split('/')
        if (+year >= +accYear && +month > +accMonth) acc = currMonth
        return acc
    }, { time: '00/00' })

    const lastMonth = await getById(miniMinth._id)
    return lastMonth
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


