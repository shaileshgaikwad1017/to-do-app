import React from 'react';
import logo from './logo.svg';
// import './todo.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDoIndex } from './components/todo-index';
import { ToDoRegister } from './components/todo-user-register';
import { ToDoUserLogin } from './components/todo-user-login';
import { ToDoUserDashboard } from './components/todo-user-dashboard';
import { AddAppointment } from './components/todo-add-appointment';
import { ToDoEditAppointment } from './components/todo-edit-appointment';
import { ToDoDeleteAppointment } from './components/todo-delete-appointment';

function App() {
  return (
    <div className="App bg-image">
      <section>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<ToDoIndex />} ></Route>
            <Route path='register' element={<ToDoRegister />} />
            <Route path='login' element={<ToDoUserLogin />} />
            <Route path='user-dashboard' element={<ToDoUserDashboard />}></Route>
            <Route path='add-appointment' element={<AddAppointment />} />
            <Route path='edit-appointment/:id' element={<ToDoEditAppointment />}></Route>
            <Route path='delete-appointment/:id' element={<ToDoDeleteAppointment />}></Route>
        </Routes>
      </BrowserRouter>
      </section>
    </div>
  );
}

export default App;
