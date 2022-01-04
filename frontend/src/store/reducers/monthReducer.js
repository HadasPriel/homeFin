const initialState = {
  currMonth: {}
}

export function monthReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_MONTH':
      return { ...state, currMonth: action.month }
    case 'SET_MONTHS':
      return { ...state, months: action.months }
    case 'ADD_MONTH':
      return { ...state, months: [...state.months, action.month] }
    case 'REMOVE_MONTH':
      return { ...state, months: state.months.filter(month => month._id !== action.monthId) }
    case 'UPDATE_MONTH':
      return {
        ...state,
        currMonth: action.month
        // months: state.months.map(month =>
        //   month._id === action.month._id ? action.month : month
        // )
      }
    default:
      return state
  }
}
