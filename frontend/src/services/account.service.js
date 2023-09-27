import { httpService } from './http.service'
// import { userService } from './user.service'

export const accountService = {
  query,
  getById,
  remove,
  add,
  toggleMember,
  saveDescription,
  saveTitle,
  saveLabel,
  removeLabel,
  updateCols,
  updateCurrency
}

async function query(filterBy) {
  return await httpService.get(`account`)
}

async function getById(id) {
  return await httpService.get(`account/${id}`)
}

async function remove(accountId) {
  return httpService.delete('account', accountId)
}

async function add(account) {
  return await httpService.post(`account`, account)
}

async function toggleMember(accountId, member) {
  return await httpService.put(`account/member`, { accountId, member })
}

async function saveDescription(accountId, description) {
  return await httpService.put(`account/description`, { accountId, description })
}

async function saveTitle(accountId, title) {
  return await httpService.put(`account/title`, { accountId, title })
}

async function saveLabel(accountId, label) {
  return await httpService.put(`account/labels`, { accountId, label })
}

async function removeLabel(accountId, labelId) {
  return await httpService.put(`account/label/remove`, { accountId, labelId })
}

async function updateCols(accountId, cols) {
  return await httpService.put(`account/cols`, { accountId, cols })
}

async function updateCurrency(accountId, currency) {
  return await httpService.put(`account/currency`, { accountId, currency })
}
