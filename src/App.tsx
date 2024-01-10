import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from './features/auth/Register';
import { Provider } from 'react-redux'
import { store } from './common/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Register />
        </header>
      </div>
    </Provider>
  );
}

export default App;
