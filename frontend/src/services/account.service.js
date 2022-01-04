import { httpService } from './http.service'
import { storageService } from './async-storage.service'
// import { userService } from './user.service'

export const accountService = {
  query,
  getById,
  remove,
  add,
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

async function query(filterBy) {
  return httpService.get(`account`)
}
function getById(id) {
  return httpService.get(`account/${id}`)
}

function remove(accountId) {
  // return httpService.delete(`account/${accountId}`)
  return storageService.delete('account', accountId)

}
async function add(account) {
  // const addedAccount = await httpService.post(`account`, account)

  // account.byUser = userService.getLoggedinUser()
  // account.aboutUser = await userService.getById(account.aboutUserId)
  const addedAccount = storageService.post('account', account)

  return addedAccount
}
