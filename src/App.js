import './App.css';
import Register from '../src/Components/Register';
import SignIn from '../src/Components/SignIn';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import TaskManagement from './Components/TaskManagement';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      {/* <Register/> */}
      <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Register />} />
      <Route path="/task" element={<TaskManagement />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;