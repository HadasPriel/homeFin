import { monthService } from '../../services/month.service'
import { store } from '../store'
// import { userService } from '../../services/user.service'

const monthActions = {
  loadMonths,
  loadMonth,
  loadPrevNextMonth,
  // addMonth,
  addCtegory,
  updateCtegory,
  removeCategory,
  addExpense,
  updateExpense,
  removeExpense,
  removeMonth
}


export function loadMonths() {
  return async dispatch => {
    try {
      const months = await monthService.query()
      dispatch({ type: 'SET_MONTHS', months })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

export function loadMonth(monthId) {
  return async dispatch => {
    try {
      const month = await monthService.getById(monthId)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

export function loadPrevNextMonth(prevMonth, diff) {
  return async dispatch => {
    try {
      const currAcount = store.getState().accountModule.currAcount
      const months = currAcount.months

      const monthIdx = months.findIndex(currMonth => prevMonth._id === currMonth._id)
      const PrevNextMonthId = months[monthIdx + diff]?._id
      if (!PrevNextMonthId) var month = await monthService.add(currAcount._id, prevMonth, diff)
      else month = await monthService.getById(PrevNextMonthId)
      console.log('**********', month);
      dispatch({ type: 'SET_MONTH', month })
    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}


// export function addMonth(month) {
//   return async dispatch => {
//     try {
//       const addedMonth = await monthService.add(month)
//       dispatch({ type: 'ADD_MONTH', month: addedMonth })

//       const score = await userService.increaseScore()
//       dispatch({ type: 'SET_SCORE', score })

//     } catch (err) {
//       console.log('MonthActions: err in addMonth', err)
//     }
//   }
// }

export function addCtegory(monthId, category) {
  return async dispatch => {
    try {
      const month = await monthService.addCtegory(monthId, category)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in addCtegory', err)
    }
  }
}

export function updateCtegory(monthId, category) {
  return async dispatch => {
    try {
      const month = await monthService.updateCtegory(monthId, category)
      dispatch({ type: 'UPDATE_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

export function removeCategory(monthId, categoryId) {
  return async dispatch => {
    try {
      const month = await monthService.removeCategory(monthId, categoryId)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in removeCategory', err)
    }
  }
}

export function addExpense(monthId, categoryId, expense) {
  return async dispatch => {
    try {
      const month = await monthService.addExpense(monthId, categoryId, expense)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

export function removeExpense(monthId, categoryId, expenseId) {
  return async dispatch => {
    try {
      const month = await monthService.removeExpense(monthId, categoryId, expenseId)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

export function updateExpense(monthId, categoryId, expense) {
  return async dispatch => {
    try {
      const month = await monthService.updateExpense(monthId, categoryId, expense)
      dispatch({ type: 'UPDATE_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}


export function removeMonth(monthId) {
  return async dispatch => {
    try {
      await monthService.remove(monthId)
      dispatch({ type: 'REMOVE_MONTH', monthId })
    } catch (err) {
      console.log('MonthActions: err in removeMonth', err)
    }
  }
}


export default monthActions