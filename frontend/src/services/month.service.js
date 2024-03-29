import { httpService } from './http.service'
import { storageService } from './async-storage.service'
// import { userService } from './user.service'

export const monthService = {
    query,
    getById,
    getPrevNext,
    remove,
    add,
    update,
    addCtegory,
    updateCtegory,
    removeCategory,
    addExpense,
    updateExpense,
    removeExpense,
    addComment
}

async function query(filterBy) {
    return httpService.get(`month`)
}

async function getById(monthId) {
    return httpService.get(`month/${monthId}`)
}

async function getPrevNext(monthId, diff) {
    return httpService.get(`month/${monthId}/prevNext/${diff}`)
}

function remove(monthId) {
    // return httpService.delete(`month/${monthId}`)
    return storageService.delete('month', monthId)
}

async function add(accountId, time) {
    // month.byUser = userService.getLoggedinUser()
    return await httpService.post('month', { accountId, time })
}
async function update(monthToSave) {
    // month.byUser = userService.getLoggedinUser()
    return await httpService.put('month', { monthToSave })
}

async function addCtegory(monthId) {
    return await httpService.post(`month/${monthId}/category`)
}

async function updateCtegory(monthId, category) {
    return await httpService.put(`month/${monthId}/category`, { category, monthId })
}

async function removeCategory(monthId, categoryId) {
    return await httpService.delete(`month/${monthId}/category`, { categoryId, monthId })
}

async function addExpense(monthId, categoryId, expense, isIncome) {
    const addedMonth = await httpService.post(`month/${monthId}/expense`, { categoryId, expense, isIncome })
    return addedMonth
}

async function removeExpense(monthId, categoryId, expenseId) {
    return await httpService.delete(`month/${monthId}/expense`, { categoryId, expenseId })
}

async function updateExpense(monthId, categoryId, expense, isIncome) {
    return await httpService.put(`month/${monthId}/expense`, { categoryId, expense, monthId, isIncome })
}

async function addComment(monthId, cotegoryId, expenseId, comment) {
    return await httpService.post(`month/${monthId}/expense/comment`, { cotegoryId, expenseId, comment })
}

