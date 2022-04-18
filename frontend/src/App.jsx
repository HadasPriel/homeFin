import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'

import { AppHeader } from './cmps/AppHeader'
import { Home } from './views/Home'
import { AccountApp } from './views/AccountApp'
import { AccountDetails } from './views/AccountDetails'
import { LoginSignup } from './views/LoginSignup'

function App() {
  return (
    <div className="App flex ">
      <Router>
        <Provider store={store}>
          <AppHeader />
          <main className='app-main'>
            <Switch>
              <Route path="/account/:accountId" component={AccountDetails} />
              <Route path="/account" component={AccountApp} />
              <Route path="/login" component={LoginSignup} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
