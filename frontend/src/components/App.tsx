import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Home } from './Home'
import { RouterTest } from './RouterTest'
import { NavBar } from './NavBar'

const siteName = "Vooders.com"

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar name={siteName} />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/test' component={RouterTest} />
          </Switch>
        </div>
      </Router>
    )
  }
}
