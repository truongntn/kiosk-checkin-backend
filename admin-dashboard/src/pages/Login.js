import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px" p="6" borderWidth="1px" borderRadius="lg">
      <Heading mb="6">Admin Login</Heading>
      <FormControl mb="4">
        <FormLabel>Username</FormLabel>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleLogin}>Login</Button>
    </Box>
  );
}

export default Login;