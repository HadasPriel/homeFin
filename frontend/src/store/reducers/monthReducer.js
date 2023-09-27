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
      return { ...state, currMonth: action.month }
    case 'ADD_CATEGORY':
      return { ...state, currMonth: { ...state.currMonth, categories: [action.category, ...state.currMonth.categories] } }
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        currMonth: {
          ...state.currMonth,
          categories: state.currMonth.categories.map(category => {
            if (category.id === action.category.id) return action.category
            else return category
          })
        }
      }
    case 'UPDATE_CATEGORY_iNCOME':
      return {
        ...state,
        currMonth: {
          ...state.currMonth,
          income: action.category
        }
      }
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        currMonth: {
          ...state.currMonth,
          categories: state.currMonth.categories.filter(category => category.id !== action.categoryId)
        }
      }
    default:
      return state
  }
}
