const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const asyncLocalStorage = require('../../services/als.service')
const utilService = require('../../services/util.service')

const ObjectId = require('mongodb').ObjectId


async function query(loggedinUser, filterBy = {}) {
    try {
        const criteria = _buildCriteria(loggedinUser, filterBy)
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
        const accountToAdd = _createAccount(account)
        accountToAdd.byUser._id = ObjectId(account.byUser._id)
        accountToAdd.members[0]._id = ObjectId(accountToAdd.members[0]._id)
        const collection = await dbService.getCollection('account')
        await collection.insertOne(accountToAdd)
        return accountToAdd;
    } catch (err) {
        logger.error('cannot insert account', err)
        throw err
    }
}

async function toggleMember(accountId, member) {
    try {
        const collection = await dbService.getCollection('account')
        const account = await collection.findOne({ _id: ObjectId(accountId) })
        const idx = account.members.findIndex(accountMember => accountMember._id === member._id)
        if (idx === -1) account.members.push(member)
        else account.members.splice(idx, 1)
        await collection.updateOne({ _id: account._id }, { $set: account })
    } catch (err) {
        logger.error('cannot toggle member to account', err)
        throw err
    }
}

async function saveDescription(accountId, description) {
    try {
        const collection = await dbService.getCollection('account')
        const account = await collection.findOne({ _id: ObjectId(accountId) })
        account.description = description
        await collection.updateOne({ _id: ObjectId(account._id) }, { $set: account })
        await collection.findOne({ _id: ObjectId(accountId) })
    } catch (err) {
        logger.error('cannot save description to account', err)
        throw err
    }
}

async function saveLabel(accountId, label) {
    try {
        const collection = await dbService.getCollection('account')
        const account = await collection.findOne({ _id: ObjectId(accountId) })
        const idx = account.labels.findIndex(currLabel => currLabel.id === label.id)
        console.log('idx:', idx);
        if (idx === -1) {
            label.id = utilService.makeId()
            account.labels.push(label)
        }
        else account.labels[idx] = label
        await collection.updateOne({ _id: ObjectId(account._id) }, { $set: account })
        await collection.findOne({ _id: ObjectId(accountId) })
    } catch (err) {
        logger.error('cannot save label to account', err)
        throw err
    }
}

async function removeLabel(accountId, labelId) {
    try {
        const collection = await dbService.getCollection('account')
        const account = await collection.findOne({ _id: ObjectId(accountId) })
        account.labels = account.labels.filter(currLabel => currLabel.id !== labelId)
        await collection.updateOne({ _id: ObjectId(account._id) }, { $set: account })
        await collection.findOne({ _id: ObjectId(accountId) })
    } catch (err) {
        logger.error('cannot save label to account', err)
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

function _createAccount(account) {
    return {
        title: account.title,
        description: '',
        byUser: account.byUser,
        members: [account.byUser],
        methods: [ //TODO: remove, labels got this role...
            { id: "1", type: "creditCard", code: "2244" },
            { id: "2", type: "creditCard", code: "1111" },
            { id: "1", type: "cash" }
        ],
        mainCurrency: 'USA',
        months: [],
        cols: ['repeated', 'sum', 'labels', 'date', 'person'],
        labels: [
            { id: utilService.makeId(), txt: 'Done', color: 'lb1' },
            { id: utilService.makeId(), txt: 'Stuck', color: 'lb12' },
            { id: utilService.makeId(), txt: 'Working on it', color: 'lb16' }
        ]
    }
}

function _buildCriteria(loggedinUser, filterBy) {
    const criteria = {}
    criteria.members = { $elemMatch: { _id: ObjectId(loggedinUser._id) } }
    return criteria
}

module.exports = {
    query,
    getById,
    remove,
    add,
    addMonth,
    toggleMember,
    saveDescription,
    saveLabel,
    removeLabel
}


