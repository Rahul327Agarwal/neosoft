// import './App.css';
import Register from '../src/Components/Register';
import SignIn from '../src/Components/SignIn';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import TaskManagement from './Components/TaskManagement';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Register />} />
      <Route path="/task" element={<TaskManagement />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;