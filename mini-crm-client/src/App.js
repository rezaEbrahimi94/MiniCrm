import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./Auth/Login";

import Dashboard from './Pages/Dashboard';
import AddCompany from './Pages/Company/AddCompany';
import EditCompany from './Pages/Company/EditCompany';
import AddEmployee from './Pages/Employee/AddEmployee';

import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import NotFound from "./Pages/NotFound";
import EditEmployee from "./Pages/Employee/EditEmployee";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/dashboard"  element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          <Route path="/edit-company/:id" element={<PrivateRoute><EditCompany /></PrivateRoute>} />
          <Route path="/add-company" element={<PrivateRoute><AddCompany /></PrivateRoute>} />

          <Route path="/add-employee" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
          <Route path="/edit-employee/:id" element={<PrivateRoute><EditEmployee /></PrivateRoute>} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
