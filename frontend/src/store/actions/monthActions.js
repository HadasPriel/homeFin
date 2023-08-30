import { monthService } from '../../services/month.service'
// import { utilService } from '../../services/util.service'
import { store } from '../store'
// import { userService } from '../../services/user.service'

const monthActions = {
  loadMonths,
  loadMonth,
  loadMonthByTime,
  updateMonth,
  addCtegory,
  updateCtegory,
  removeCategory,
  addExpense,
  updateExpense,
  removeExpense,
  removeMonth,
  addComment
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
      console.log('MonthActions: err in loadMonth', err)
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
      console.log('MonthActions: err in loadMonthByTime', err)
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

function updateMonth(monthToSave) {
  return async dispatch => {
    // Use optimistic updates to enhance user experience
    const prevMonth = store.getState().monthModule.currMonth
    try {
      dispatch({ type: 'UPDATE_MONTH', month: monthToSave })
      await monthService.update(monthToSave)
    } catch (err) {
      dispatch({ type: 'UPDATE_MONTH', month: prevMonth })
      console.log('MonthActions: err in updateMonth', err)
    }
  }
}

function addCtegory(monthId, categoryToSave) {
  return async dispatch => {
    try {
      const category = await monthService.addCtegory(monthId, categoryToSave)
      dispatch({ type: 'ADD_CATEGORY', category })

    } catch (err) {
      console.log('MonthActions: err in addCtegory', err)
    }
  }
}

function updateCtegory(monthId, categoryToSave) {
  // Use optimistic updates to enhance user experience
  const prevCategory = store.getState().monthModule.currMonth.categories.find(ca => ca.id === categoryToSave.id)
  return async dispatch => {
    try {
      dispatch({ type: 'UPDATE_CATEGORY', category: categoryToSave })
      await monthService.updateCtegory(monthId, categoryToSave)
    } catch (err) {
      dispatch({ type: 'UPDATE_CATEGORY', category: prevCategory })
      console.log('MonthActions: err in updateCtegory', err)
    }
  }
}

function removeCategory(monthId, categoryId) {
  return async dispatch => {
    try {
      await monthService.removeCategory(monthId, categoryId)
      dispatch({ type: 'REMOVE_CATEGORY', categoryId })

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
      console.log('MonthActions: err in addExpense', err)
    }
  }
}

function removeExpense(monthId, categoryId, expenseId) {
  return async dispatch => {
    try {
      const month = await monthService.removeExpense(monthId, categoryId, expenseId)
      dispatch({ type: 'SET_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in removeExpense', err)
    }
  }
}

function updateExpense(monthId, categoryId, expense) {
  return async dispatch => {
    try {
      const month = await monthService.updateExpense(monthId, categoryId, expense)
      dispatch({ type: 'UPDATE_MONTH', month })

    } catch (err) {
      console.log('MonthActions: err in updateExpense', err)
    }
  }
}

function addComment(monthId, cotegoryId, expenseId, comment) {
  return async dispatch => {
    try {
      console.log('monthId, expenseId, comment:', monthId)
      const category = await monthService.addComment(monthId, cotegoryId, expenseId, comment)
      dispatch({ type: 'UPDATE_CATEGORY', category })

    } catch (err) {
      console.log('MonthActions: err in updateExpense', err)
    }
  }
}



export default monthActions