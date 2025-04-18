import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Queue from './pages/Queue';
import Users from './pages/Users';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;