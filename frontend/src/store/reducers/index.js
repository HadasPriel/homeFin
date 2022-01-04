import { combineReducers } from 'redux'
import { accountReducer } from './accountReducer'
import { monthReducer } from './monthReducer'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer'

export const rootReducer = combineReducers({
  systemModule: systemReducer,
  accountModule: accountReducer,
  monthModule: monthReducer,
  userModule: userReducer
})
