import './App.css';
import AdminProduct from './container/adminProduct/AdminProduct';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/login/Login';
import TestButton from './container/adminProduct/TestButton';
// import NavbarHeader from './components/header/NavbarHeader';
function App () {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/TestButton">
            <TestButton />
          </Route>
          <Route path="/AdminProduct">
            <AdminProduct />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
