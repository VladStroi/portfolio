import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';

import { Header } from './app-bar';
import { routes } from './pages';
import { rootStore } from './common/rootStore';

import './App.css';

export const App = () => {
  return (
    <Provider store={rootStore}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.content} />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};
