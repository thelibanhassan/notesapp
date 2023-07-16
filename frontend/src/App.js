import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import './index.css';
import { EditNote } from "./pages/editNote/EditNote";
import Login from "./pages/login/Login";
import NewNote from "./pages/newNote/NewNote";
import Notes from "./pages/notes/Notes";
import Register from "./pages/register/Register";
import AuthContextProvider from "./components/AuthContext";

function App() {

  return (
    <AuthContextProvider>
      <div className="h-full box-border	">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" exact element={<ProtectedRoute><Notes /></ProtectedRoute>} />
            <Route path="/newnote" element={<ProtectedRoute><NewNote /></ProtectedRoute>} />
            <Route path="/:id" element={<ProtectedRoute><EditNote /></ProtectedRoute>} />
          </Routes>

        </Router>

      </div>
    </AuthContextProvider>
  );
}

export default App;
