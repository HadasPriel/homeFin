const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const accountService = require('./account.service')

async function getAccounts(req, res) {
    try {
        const accounts = await accountService.query(req.query)
        res.send(accounts)
    } catch (err) {
        logger.error('Cannot get accounts', err)
        res.status(500).send({ err: 'Failed to get accounts' })
    }
}

async function getAccount(req, res) {
    console.log('req.query', req.params);
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
        account.byUserId = req.session.user._id
        account = await accountService.add(account)

        // prepare the updated account for sending out
        account.aboutUser = await userService.getById(account.aboutUserId)

        // Give the user credit for adding a account
        var user = await userService.getById(account.byUserId)
        user.score += 10;
        user = await userService.update(user)
        account.byUser = user
        const fullUser = await userService.getById(user._id)

        console.log('CTRL SessionId:', req.sessionID);
        socketService.broadcast({ type: 'account-added', data: account, userId: account.byUserId })
        socketService.emitToUser({ type: 'account-about-you', data: account, userId: account.aboutUserId })
        socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(account)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add account', err)
        res.status(500).send({ err: 'Failed to add account' })
    }
}

module.exports = {
    getAccounts,
    getAccount,
    deleteAccount,
    addAccount
}