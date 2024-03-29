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
        return month
    } catch (err) {
        logger.error('cannot insert month', err)
        throw err
    }
}

async function update(month) {
    try {
        const collection = await dbService.getCollection('month')
        month._id = ObjectId(month._id)
        await collection.updateOne({ _id: month._id }, { $set: month })
        return month
    } catch (err) {
        logger.error('cannot insert month', err)
        throw err
    }
}

async function addCategory(monthId) {
    try {
        const collection = await dbService.getCollection('month')
        const categoryToAdd = _createCategory()
        await collection.updateOne(
            { _id: ObjectId(monthId) },
            { $push: { categories: { $each: [categoryToAdd], $position: 0 } } }
        )
        return categoryToAdd;
    } catch (err) {
        logger.error('cannot insert category', err)
        throw err
    }
}

async function updateCategory(monthId, category) {
    try {
        if (category.id === 'in101') _updateIncome(monthId, category)
        else {
            const collection = await dbService.getCollection('month')
            await collection.updateOne(
                { _id: ObjectId(monthId), 'categories.id': category.id },
                { $set: { 'categories.$': category } }
            )
            return category
        }
    } catch (err) {
        logger.error('cannot update category', err)
        throw err
    }
}

async function _updateIncome(monthId, category) {
    try {
        const collection = await dbService.getCollection('month')
        await collection.updateOne(
            { _id: ObjectId(monthId) },
            { $set: { 'income': category } }
        )
        return category
    } catch (err) {
        logger.error('cannot update category', err)
        throw err
    }
}

async function removeCategory(monthId, categoryId) {
    try {
        if (categoryId === 'in101') return Promise.reject('Income category cannot be deleted')

        const collection = await dbService.getCollection('month')
        await collection.updateOne(
            { _id: ObjectId(monthId) },
            { $pull: { categories: { id: categoryId } } }
        )
        return categoryId
    } catch (err) {
        logger.error('cannot remove category', err)
        throw err
    }
}

async function addExpense(monthId, categoryId, expense, isIncome) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        const expenseToAdd = _createExpense(expense)

        if (isIncome) monthToSave.income.expenses.push(expenseToAdd)
        else {
            const categoryIdx = monthToSave.categories.findIndex(categ => categ.id === categoryId)
            monthToSave.categories[categoryIdx].expenses.push(expenseToAdd)
        }

        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave
    } catch (err) {
        logger.error('cannot insert month', err)
        throw err
    }
}

async function updateExpense(monthId, categoryId, expenseToSave, isIncome) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        if (isIncome) {
            monthToSave.income.expenses = monthToSave.income.expenses.map(expense => (expense.id === expenseToSave.id) ? expenseToSave : expense)
        } else {
            const categoryIdx = monthToSave.categories.findIndex(categ => categ.id === categoryId)
            monthToSave.categories[categoryIdx].expenses = monthToSave.categories[categoryIdx].expenses.map(expense => (expense.id === expenseToSave.id) ? expenseToSave : expense)
        }

        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave
    } catch (err) {
        logger.error('cannot update expense', err)
        throw err
    }
}

async function removeExpense(monthId, categoryId, expenseId) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        if (categoryId === 'in101') monthToSave.income.expenses = monthToSave.income.expenses.filter(expense => expense.id !== expenseId)
        else {
            const categoryIdx = monthToSave.categories.findIndex(categ => categ.id === categoryId)
            monthToSave.categories[categoryIdx].expenses = monthToSave.categories[categoryIdx].expenses.filter(expense => expense.id !== expenseId)
        }

        await collection.updateOne({ _id: monthToSave._id }, { $set: monthToSave })
        return monthToSave
    } catch (err) {
        logger.error('cannot insert expense', err)
        throw err
    }
}

async function addComment(monthId, categoryId, expenseId, comment) {
    try {
        const collection = await dbService.getCollection('month')
        let monthToSave = await collection.findOne({ _id: ObjectId(monthId) })

        comment.id = utilService.makeId()
        const category = monthToSave.categories.find(categ => categ.id === categoryId)
        const expense = category.expenses.find(expense => expense.id === expenseId)
        expense.comments.push(comment)

        await collection.updateOne(
            { _id: ObjectId(monthId), 'categories.id': categoryId },
            { $set: { 'categories.$': category } }
        )
        return category
    } catch (err) {
        logger.error('cannot insert comment', err)
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
        },
        comments: []
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
function _createIncome() {
    return {
        id: 'in101',
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
        income: prevMonth?.income || _createIncome()
    }
}

function _getCategories(month) {
    if (!month || !month.categories) return []

    // var isIncome = false
    var categsToReturn = month.categories.map(categ => {
        // if (categ.isIncome) isIncome = true
        categ.expenses = categ.expenses.filter((expense => expense.repeat))
        return categ
    })

    // if (!isIncome) { categsToReturn.push(_createIncome()) }
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
    update,
    addCategory,
    updateCategory,
    removeCategory,
    addExpense,
    updateExpense,
    removeExpense,
    addComment
}


