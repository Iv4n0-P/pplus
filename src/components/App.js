import React from 'react'
import Menu from './Menu'
import Meals from './Meals'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import history from '../history'

const App = () => {

    return (
        <div>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" component={Menu} exact />
                        <Route path="/menu" component={Meals} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App