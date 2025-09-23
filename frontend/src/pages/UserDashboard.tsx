import { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react'

interface CompletedSurvey {
  id: number
  title: string
  completedDate: string
  pointsEarned: number
}

const UserDashboard = () => {
  const [stats] = useState({
    totalPoints: 750,
    surveysCompleted: 15,
    averageRating: 4.8,
  })

  const [completedSurveys] = useState<CompletedSurvey[]>([
    {
      id: 1,
      title: 'Customer Experience Survey',
      completedDate: '2025-09-18',
      pointsEarned: 100,
    },
    {
      id: 2,
      title: 'Product Feedback',
      completedDate: '2025-09-17',
      pointsEarned: 150,
    },
    // Add more completed surveys as needed
  ])

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Your Dashboard</Heading>

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} mb={8}>
        <Stat p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <StatLabel>Total Points</StatLabel>
          <StatNumber>{stats.totalPoints}</StatNumber>
        </Stat>
        <Stat p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <StatLabel>Surveys Completed</StatLabel>
          <StatNumber>{stats.surveysCompleted}</StatNumber>
        </Stat>
        <Stat p={4} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <StatLabel>Average Rating</StatLabel>
          <StatNumber>{stats.averageRating}/5.0</StatNumber>
        </Stat>
      </Grid>

      <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
        <Heading size="md" mb={4}>
          Recent Survey Activity
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Survey Title</Th>
              <Th>Completion Date</Th>
              <Th isNumeric>Points Earned</Th>
            </Tr>
          </Thead>
          <Tbody>
            {completedSurveys.map((survey) => (
              <Tr key={survey.id}>
                <Td>{survey.title}</Td>
                <Td>{survey.completedDate}</Td>
                <Td isNumeric>{survey.pointsEarned}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  )
}

export default UserDashboard
