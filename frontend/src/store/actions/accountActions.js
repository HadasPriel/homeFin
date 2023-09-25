import { accountService } from '../../services/account.service'
import { store } from '../store'
// import { userService } from '../../services/user.service'

const accountActions = {
  loadAccounts,
  loadAccount,
  addAccount,
  removeAccount,
  toggleMember,
  saveDescription,
  saveLabel,
  removeLabel,
  updateCols,
  updateCurrency
}


function loadAccounts() {
  return async dispatch => {
    try {
      const accounts = await accountService.query()
      dispatch({ type: 'SET_ACCOUNTS', accounts })

    } catch (err) {
      console.log('AccountActions: err in loadAccounts', err)
    }
  }
}
function loadAccount(accountId) {
  return async dispatch => {
    try {
      const account = await accountService.getById(accountId)
      dispatch({ type: 'SET_ACCOUNT', account })

    } catch (err) {
      console.log('AccountActions: err in loadAccounts', err)
    }
  }
}

function addAccount(account) {
  return async dispatch => {
    try {
      const addedAccount = await accountService.add(account)
      dispatch({ type: 'ADD_ACCOUNT', account: addedAccount })


    } catch (err) {
      console.log('AccountActions: err in addAccount', err)
    }
  }
}

function removeAccount(accountId) {
  return async dispatch => {
    try {
      await accountService.remove(accountId)
      dispatch({ type: 'REMOVE_ACCOUNT', accountId })
    } catch (err) {
      console.log('AccountActions: err in removeAccount', err)
    }
  }
}

function toggleMember(accountId, member) {
  return async dispatch => {
    try {
      await accountService.toggleMember(accountId, member)
      dispatch({ type: 'TOGGLE_MEMBER', member })
    } catch (err) {
      console.log('AccountActions: err in toggleMember', err)
    }
  }
}

function saveDescription(accountId, description) {
  return async dispatch => {
    try {
      await accountService.saveDescription(accountId, description)
      dispatch({ type: 'SAVE_DESCRIPTION', description })
    } catch (err) {
      console.log('AccountActions: err in saveDescription', err)
    }
  }
}

function saveLabel(accountId, label) {
  // Use optimistic updates to enhance user experience
  const prevLabels = store.getState().accountModule.currAcount.labels
  return async dispatch => {
    try {
      dispatch({ type: 'SAVE_LABEL', label })
      await accountService.saveLabel(accountId, label)
    } catch (err) {
      dispatch({ type: 'SAVE_LABEL', label: prevLabels })
      console.log('AccountActions: err in saveLabel', err)
    }
  }
}

function removeLabel(accountId, labelId) {
  return async dispatch => {
    try {
      await accountService.removeLabel(accountId, labelId)
      dispatch({ type: 'REMOVE_LABEL', labelId })
    } catch (err) {
      console.log('AccountActions: err in removeLabel', err)
    }
  }
}

function updateCols(accountId, cols) {
  // Use optimistic updates to enhance user experience
  const prevCols = store.getState().accountModule.currAcount.cols
  return async dispatch => {
    try {
      dispatch({ type: 'UPDATE_COLS', cols })
      await accountService.updateCols(accountId, cols)
    } catch (err) {
      dispatch({ type: 'UPDATE_COLS', cols: prevCols })
      console.log('AccountActions: err in updateCols', err)
    }
  }
}

function updateCurrency(accountId, currency) {
  return async dispatch => {
    try {
      dispatch({ type: 'UPDATE_CURRENCY', currency })
      await accountService.updateCurrency(accountId, currency)
    } catch (err) {
      console.log('AccountActions: err in updateCurrency', err)
    }
  }
}


export default accountActions