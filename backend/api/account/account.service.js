const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('account')
        const accounts = await collection.find(criteria).toArray()
        return accounts
    } catch (err) {
        logger.error('cannot find accounts', err)
        throw err
    }
}

async function getById(accountId) {
    try {
        const collection = await dbService.getCollection('account')
        return await collection.findOne({ _id: ObjectId(accountId) })
    } catch (err) {
        logger.error('cannot find accounts', err)
        throw err
    }
}

async function remove(accountId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('account')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(accountId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove account ${accountId}`, err)
        throw err
    }
}

async function add(account) {
    try {
        // peek only updatable fields!
        const accountToAdd = {
            byUserId: ObjectId(account.byUserId),
            aboutUserId: ObjectId(account.aboutUserId),
            txt: account.txt
        }
        const collection = await dbService.getCollection('account')
        await collection.insertOne(accountToAdd)
        return accountToAdd;
    } catch (err) {
        logger.error('cannot insert account', err)
        throw err
    }
}

async function addMonth(accountId, month) {
    try {
        const monthToAdd = {
            _id: month._id,
            time: month.time
        }
        const collection = await dbService.getCollection('account')
        const account = await collection.findOne({ _id: ObjectId(accountId) })
        account.months.push(monthToAdd)
        console.log(account);
        await collection.updateOne({ _id: account._id }, { $set: account })
        console.log('after!');
    } catch (err) {
        logger.error('cannot insert account', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    getById,
    remove,
    add,
    addMonth
}


