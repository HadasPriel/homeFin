const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { addAccount, getAccounts, getAccount, deleteAccount, toggleMember, saveDescription, saveTitle, saveLabel, deleteLabel, updateCols, updateCurrency } = require('./account.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getAccounts)
router.get('/:id', log, getAccount)
router.post('/', log, addAccount)
router.delete('/:id', deleteAccount)
router.put(`/member`, toggleMember)
router.put(`/description`, saveDescription)
router.put(`/title`, saveTitle)
router.put(`/labels`, saveLabel)
router.put(`/label/remove`, deleteLabel)
router.put(`/cols`, updateCols)
router.put(`/currency`, updateCurrency)

module.exports = router