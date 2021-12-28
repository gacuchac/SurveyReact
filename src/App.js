
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { SurveySelect } from './components/SurveySelect';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SurveySelect/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
