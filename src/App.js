import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import CreateAsset from 'features/wallet/CreateAsset';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <Switch>
        <Route path="/asset/create" exact component={CreateAsset}/>
        <Redirect from="*" to="/asset/create"/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
