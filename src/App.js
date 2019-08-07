import React, { useState } from 'react';
//components
import { library } from '@fortawesome/fontawesome-svg-core'
import {faCircle } from '@fortawesome/free-solid-svg-icons'
import './App.css';
library.add(faCircle);

export default function App() {
  const [start, setStart] = useState(false);
  return (
    <div className='App'>
    </div>
  );
}
