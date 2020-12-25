import './App.css';
import { ROUTES_MAP } from '../utils/routesMap.js';
import Header from './Header.js';
import Main from './Main.js';
import SavedNews from './SavedNews.js';
import React, { useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={ROUTES_MAP.MAIN}>
          <Main />
        </Route>
        <Route path={ROUTES_MAP.SAVED_NEWS}>
          <SavedNews />
        </Route>
      </Switch>
    </>
  );
}

export default App;
