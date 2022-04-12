import { accountService } from '../../services/account.service'
// import { userService } from '../../services/user.service'

const accountActions = {
  loadAccounts,
  loadAccount,
  addAccount,
  removeAccount,
  toggleMember
}


function loadAccounts() {
  return async dispatch => {
    try {
      const accounts = await accountService.query()
      console.log(accounts, "accounts");
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


export default accountActions