import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCheckIns: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get('http://localhost:5000/api/queue', config);
      setStats({
        totalUsers: res.data.length,
        totalCheckIns: res.data.reduce((sum, entry) => sum + 1, 0),
      });
    };
    fetchStats();
  }, []);

  return (
    <Box p="6">
      <Heading>Dashboard</Heading>
      <Text mt="4">Total Users: {stats.totalUsers}</Text>
      <Text>Total Check-Ins: {stats.totalCheckIns}</Text>
    </Box>
  );
}

export default Dashboard;