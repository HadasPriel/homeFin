const initialState = {
  accounts: [],
  currAcount: null
}

export function accountReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return { ...state, currAcount: action.account }
    case 'SET_ACCOUNTS':
      return { ...state, accounts: action.accounts }
    case 'ADD_ACCOUNT':
      return { ...state, accounts: [...state.accounts, action.account] }
    case 'REMOVE_ACCOUNT':
      return { ...state, accounts: state.accounts.filter(account => account._id !== action.accountId) }
    case 'ADD_ACCOUNT_MONTH':
      return { ...state, currAcount: { ...state.currAcount, months: [...state.currAcount.months, action.miniMonth] } }
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.map(account =>
          account._id === action.account._id ? action.account : account
        )
      }
    case 'TOGGLE_MEMBER':
      var members = JSON.parse(JSON.stringify(state.currAcount.members))
      const idx = state.currAcount.members.findIndex(member =>
        member._id === action.member._id)
      if (idx === -1) members.push(action.member)
      else members.splice(idx, 1)
      return {
        ...state,
        currAcount: { ...state.currAcount, members }
      }
    case 'SAVE_DESCRIPTION':
      return { ...state, currAcount: { ...state.currAcount, description: action.description } }
    default:
      return state
  }
}
