import React from 'react';
import Header from './../header/header';
import './app.css'
import { Switch, Route } from 'react-router-dom';
import MainPage from './../pages/main-page/main-page';
import Standings from './../pages/standings/standings';



const App = () => {
  return (
    <div>
      <Header />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/standings' component={Standings} />
        </Switch>     
    </div>
  )
}

export default App


