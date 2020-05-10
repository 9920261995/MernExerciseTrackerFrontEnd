import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './component/Navbar.component'
import ExerciseList from './component/exercise-list.component'
import EditExercise from './component/edit-exercise.component'
import CreateExercise from './component/create-exercise.component'
import CreateUser from './component/create-user.component'
import {Container} from 'reactstrap'

function App() {
  return (
    <Router>
      
      <Navbar/>
      <Container>
      <br/>
      <Route path = "/" exact component  = {ExerciseList}/ >
      <Route path = "/edit/:id" component = {EditExercise} />
      <Route path = "/create" component = {CreateExercise}/>
      <Route path = "/user" component = {CreateUser}/>
      </Container>
    </Router>
  );
}

export default App;
