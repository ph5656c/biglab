
import './App.css';
import{ BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from './components/order';
import Inventor from './components/inventor';
import Attendance from './components/attendance';
import Attdatetime from './components/attdatetime';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/I" Component={Inventor} />
        <Route path="/" Component={Order} />
        <Route path="/A" Component={Attendance} />
        <Route path="/A2" Component={Attdatetime} />

      </Routes>
    </Router>
  );
}

export default App;
