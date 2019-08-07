import React, { useState } from 'react';
import questions from './data/index.js';
//components
import Quiz from './components/Quiz.jsx';
import StartMenu from './components/StartMenu.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faCircle } from '@fortawesome/free-solid-svg-icons'
import './App.css';
library.add(faCircle);

export default function App() {
  const [start, setStart] = useState(false);
  return (
    <div className='App'>
      {start ? <Quiz quiz={questions} /> : <StartMenu setStart={setStart} />}
    </div>
  );
}
