import { monthService } from '../../services/month.service'
// import { utilService } from '../../services/util.service'
import { store } from '../store'
// import { userService } from '../../services/user.service'

const monthActions = {
  loadMonths,
  loadMonth,
  loadMonthByTime,
  addCtegory,
  updateCtegory,
  removeCategory,
  addExpense,
  updateExpense,
  removeExpense,
  removeMonth
}


function loadMonths() {
  return async dispatch => {
    try {
      const months = await monthService.query()
      dispatch({ type: 'SET_MONTHS', months })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

function loadMonth(monthId) {
  return async dispatch => {
    try {
      if (monthId) {
        const month = await monthService.getById(monthId)
        dispatch({ type: 'SET_MONTH', month })
      }
      else {
        dispatch({ type: 'SET_MONTH', month: null })
      }
    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

function loadMonthByTime(time) {
  return async dispatch => {
    try {
      const currAcount = store.getState().accountModule.currAcount
      const months = currAcount.months

      let miniMonth = months.find(currMonth => time === currMonth.time)
      if (miniMonth) var month = await monthService.getById(miniMonth._id)
      else {
        console.log('need to cerate new month!')
        month = await monthService.add(currAcount._id, time)
        miniMonth = { _id: month._id, time: month.time }
        dispatch({ type: 'ADD_ACCOUNT_MONTH', miniMonth })
      }
      dispatch({ type: 'SET_MONTH', month })
    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}


function addCtegory(monthId, category) {
  return async dispatch => {
    try {
      const month = await monthService.addCtegory(monthId, category)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in addCtegory', err)
    }
  }
}

function updateCtegory(monthId, category) {
  return async dispatch => {
    try {
      const month = await monthService.updateCtegory(monthId, category)
      dispatch({ type: 'UPDATE_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

function removeCategory(monthId, categoryId) {
  return async dispatch => {
    try {
      const month = await monthService.removeCategory(monthId, categoryId)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in removeCategory', err)
    }
  }
}

function addExpense(monthId, categoryId, expense) {
  return async dispatch => {
    try {
      const month = await monthService.addExpense(monthId, categoryId, expense)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

function removeExpense(monthId, categoryId, expenseId) {
  return async dispatch => {
    try {
      const month = await monthService.removeExpense(monthId, categoryId, expenseId)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}

function updateExpense(monthId, categoryId, expense) {
  return async dispatch => {
    try {
      const month = await monthService.updateExpense(monthId, categoryId, expense)
      dispatch({ type: 'UPDATE_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in loadMonths', err)
    }
  }
}


function removeMonth(monthId) {
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