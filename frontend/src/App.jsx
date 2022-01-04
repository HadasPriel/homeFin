import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'

import { AppHeader } from './cmps/AppHeader'
import { Home } from './views/Home'
import { AccountApp } from './views/AccountApp'
import { AccountDetails } from './views/AccountDetails'

function App() {
  return (
    <div className="App flex">
      <Router>
        <AppHeader />
        <main className='app-main'>
          <Provider store={store}>
            <Switch>
              <Route path="/account/:accountId" component={AccountDetails} />
              <Route path="/account" component={AccountApp} />
              <Route path="/" component={Home} />
            </Switch>
          </Provider>
        </main>


      </Router>
    </div>
  );
}

export default App;
