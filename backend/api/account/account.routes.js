const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { addAccount, getAccounts, getAccount, deleteAccount } = require('./account.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getAccounts)
router.get('/:id', log, getAccount)
router.post('/', log, addAccount)
router.delete('/:id', deleteAccount)

module.exports = router