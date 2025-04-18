import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Queue() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get('http://localhost:5000/api/queue', config);
      setQueue(res.data);
    };
    fetchQueue();
  }, []);

  const handleRemove = async (id) => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };
    await axios.delete(`http://localhost:5000/api/queue/${id}`, config);
    setQueue(queue.filter((entry) => entry._id !== id));
  };

  return (
    <Box p="6">
      <Heading>Queue Management</Heading>
      <Table mt="4" variant="simple">
        <Thead>
          <Tr>
            <Th>Phone</Th>
            <Th>Position</Th>
            <Th>Wait Time (min)</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {queue.map((entry) => (
            <Tr key={entry._id}>
              <Td>{entry.userId.phone}</Td>
              <Td>{entry.position}</Td>
              <Td>{entry.estimatedWaitTime}</Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleRemove(entry._id)}>
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Queue;