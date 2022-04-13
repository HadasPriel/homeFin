const logger = require('../../services/logger.service')
// const userService = require('../user/user.service')
// const socketService = require('../../services/socket.service')
const accountService = require('./account.service')

async function getAccounts(req, res) {
    loggedinUser = req.session.user
    try {
        const accounts = await accountService.query(loggedinUser, req.query)
        res.send(accounts)
    } catch (err) {
        logger.error('Cannot get accounts', err)
        res.status(500).send({ err: 'Failed to get accounts' })
    }
}

async function getAccount(req, res) {
    try {
        const accounts = await accountService.getById(req.params.id)
        res.send(accounts)
    } catch (err) {
        logger.error('Cannot get accounts', err)
        res.status(500).send({ err: 'Failed to get accounts' })
    }
}

async function deleteAccount(req, res) {
    try {
        await accountService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete account', err)
        res.status(500).send({ err: 'Failed to delete account' })
    }
}


async function addAccount(req, res) {
    try {
        var account = req.body
        account.byUser = req.session.user
        account = await accountService.add(account)

        res.send(account)

    } catch (err) {
        logger.error('Failed to add account', err)
        res.status(500).send({ err: 'Failed to add account' })
    }
}

async function toggleMember(req, res) {
    try {
        const { accountId, member } = req.body
        const members = await accountService.toggleMember(accountId, member)

        res.send(members)

    } catch (err) {
        logger.error('Failed to toggle member on account', err)
        res.status(500).send({ err: 'Failed to toggle member on account' })
    }
}

async function saveDescription(req, res) {
    try {
        const { accountId, description } = req.body
        await accountService.saveDescription(accountId, description)
        res.send()
    } catch (err) {
        logger.error('Failed to save description on account', err)
        res.status(500).send({ err: 'Failed to save description on account' })
    }
}

module.exports = {
    getAccounts,
    getAccount,
    deleteAccount,
    addAccount,
    toggleMember,
    saveDescription
}