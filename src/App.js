
import './App.css';
import{ BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from './components/order';
import Inventor from './components/inventor';
import Attendance from './components/attendance';
import Attdatetime from './components/attdatetime';
import Newcustomers from './components/customers';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/I" Component={Inventor} />v
        <Route path="/" Component={Order} />
        <Route path="/A" Component={Attendance} />
        <Route path="/A2" Component={Attdatetime} />v
        <Route path="/N" Component={Newcustomers} />v
        
      </Routes>
    </Router>
  );
}

export default App;
