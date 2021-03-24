import React from 'react'
import Menu from './Menu'
import Meals from './Meals'
import Intro from './Intro'
import Meal from './Meal'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import history from '../history'

const App = () => {

    return (
        <div>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" component={Intro} exact />
                        <Route path="/menu/:lang" component={Menu} />
                        <Route path="/meals" component={Meals} exact />
                        <Route path="/meal" component={Meal} exact />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App