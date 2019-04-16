import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Home } from './Home'
import { RouterTest } from './RouterTest'
import { NavBar } from './NavBar'
import { Errors } from './Errors'

const siteName = 'Vooders.com'

export class App extends React.Component {
  render() {
    return (
      <Router>
        <>
          <NavBar name={siteName} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/test' component={RouterTest} />
            <Route component={() => <Errors code={404} message={'Page not found.'} />} status={404} />
          </Switch>
        </>
      </Router>
    )
  }
}
