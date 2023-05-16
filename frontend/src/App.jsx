import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { useState, useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { AppHeader } from './cmps/AppHeader'
import { Home } from './views/Home'
import { AccountApp } from './views/AccountApp'
import { AccountDetails } from './views/AccountDetails'
import { LoginSignup } from './views/LoginSignup'

import { useScrolledToTop } from './hooks/useScrolledToTop.js'


function App() {
  console.log('App is running')

  const [isScrolledToTop, setIsScrolledToTop] = useState(true)

  const mainRef = useRef(null)
  const scrolledToTop = useScrolledToTop(mainRef)

  useEffect(() => {
    setIsScrolledToTop(scrolledToTop)
  }, [scrolledToTop])


  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <AppHeader />

          <main className='app-main' ref={mainRef} >
            <Switch>
              {/* <Route path="/account/:accountId" component={AccountDetails} /> */}
              <Route 
                path="/account/:accountId" 
                  render={(props) => (<AccountDetails {...props} isScrolledToTop={isScrolledToTop} />)} 
              />
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
