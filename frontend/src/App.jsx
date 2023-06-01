import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Login from './components/Auth/Login'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/superlogin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
