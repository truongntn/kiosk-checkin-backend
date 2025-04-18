import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get('http://localhost:5000/api/checkin/users', config);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <Box p="6">
      <Heading>Users</Heading>
      <Table mt="4" variant="simple">
        <Thead>
          <Tr>
            <Th>Phone</Th>
            <Th>Reward Points</Th>
            <Th>Joined</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user.phone}</Td>
              <Td>{user.rewardPoints}</Td>
              <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Users;