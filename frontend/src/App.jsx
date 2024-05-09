import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NoteList from './components/Note/NoteList';
import CreateNote from './components/Note/CreateNote';
import EditNote from './components/Note/EditNote';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/verify/:token' element={<VerifyEmail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route exact path='/notes' element={<NoteList />} />
          <Route path='/notes/create' element={<CreateNote />} />
          <Route path='/notes/edit/:id' element={<EditNote />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;