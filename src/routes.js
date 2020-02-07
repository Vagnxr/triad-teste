import React from 'react';
import { authEndpoint, clientId, redirectHome, scopes } from './config/config';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Search from './Components/Search/index';
import Home from './Components/Home/index';
import History from './Components/History/index';
import Artist from './Components/Artist/index';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="auth">
            <a
              className="link-auth"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectHome}&scope=${scopes.join(
                '%20'
              )}&response_type=token&show_dialog=true`}
            >
              Login
            </a>
          </div>
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/busca" component={Search} />
        <Route path="/artist/:id" component={Artist} />
        <Route path="/history" component={History} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
