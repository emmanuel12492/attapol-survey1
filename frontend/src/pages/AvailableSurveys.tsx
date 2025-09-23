import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Badge,
  Button,
  useColorModeValue,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { surveyService, Survey } from '../services/api'

const AvailableSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const data = await surveyService.getAllSurveys()
        setSurveys(data)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load surveys. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSurveys()
  }, [toast])

  if (isLoading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Available Surveys</Heading>
      {surveys.length === 0 ? (
        <Text>No surveys available at the moment.</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {surveys.map((survey) => (
            <Box
              key={survey.id}
              p={6}
              bg={bgColor}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
            >
              <Heading size="md" mb={2}>
                {survey.title}
              </Heading>
              <Text mb={4} color={useColorModeValue('gray.600', 'gray.300')}>
                {survey.description}
              </Text>
              <Badge colorScheme="green" mb={4}>
                {survey.points_reward} Points
              </Badge>
              <Button
                as={RouterLink}
                to={`/survey/${survey.id}`}
                colorScheme="blue"
                width="full"
              >
                Take Survey
              </Button>
            </Box>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default AvailableSurveys
