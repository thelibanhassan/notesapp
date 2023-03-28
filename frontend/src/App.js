import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import NewNote from "./components/NewNote";
import './index.css';
import { EditNote } from "./pages/editNote/EditNote";
import Login from "./pages/login/Login";
import Notes from "./pages/notes/Notes";
import Register from "./pages/register/Register";
function App() {
  return (
    <div className="h-full">
      <Router>
        <Routes>
          <Route path="/" exact element={<Notes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newnote" element={<NewNote />} />
          <Route path="/:id" element={<EditNote />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
