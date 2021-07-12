import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from './components/Navigation.js';
import CreateNote from './components/CreateNote.js';
import CreateUser from './components/CreateUser.js';
import NoteList from './components/NoteList.js';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className = "container p-4">
          <Route path = "/" exact component = {NoteList}/>

          <Route path = "/edit/:id" component = {CreateNote}/>
          <Route path = "/create" component = {CreateNote}/>
          <Route path = "/user" component = {CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
