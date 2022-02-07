
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import {Landing } from './components/Landing';
import {Survey } from './components/Survey';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/respond/:title" element={<Survey/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
