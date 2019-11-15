import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Header from './Components/Header'
import Home from './Components/pages/Home'
import Staff from './Components/pages/Staff'
import Register from './Components/Register'
import Login from './Components/auth/Login'
import Navbar from './Components/layout/Navbar'

const Imagen = () => {
  return(<img src={require('./cursos.jpg')} className="img-fluid" alt="inicial"/>)
  
}

function onAuthRequired({ history }) {
  history.push('/login');
}


function App() {
  return (
    <Router>
    
    <Security
    issuer="https://dev-382570.okta.com/oauth2/default"
    client_id="0oa1ssyh2uKclyQw5357"
    redirect_uri={window.location.origin + '/implicit/callback'}
    onAuthRequired={onAuthRequired}
    >  
    <div className="container">
    <Navbar/>   
        
    <Switch>
        <Route exact path="/" component={Imagen} />
        <Route exact path="/home" component={Home} />
        <SecureRoute path="/staff" exact={true} component={Staff} />
        <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-382570.okta.com" />
                )}
              />
        <Route path="/implicit/callback" component={ImplicitCallback} />
    </Switch>   
    </div>
    
    
    </Security>
    
    </Router>
    
  );
}

export default App;
