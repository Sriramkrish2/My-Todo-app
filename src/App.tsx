import React from 'react';

import TodoWrapper from './components/TodoWrapper/TodoWrapper';

import './App.css';

const  App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <p>
         My Todo list
        </p>
      </header>  
      <TodoWrapper/>
    </div>
  );
}

export default App;
