import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'

interface Question {
  id: number
  question_text: string
  options: string[]
}

const SurveyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  
  // Sample questions - in real app, fetch from API
  const [questions] = useState<Question[]>([
    {
      id: 1,
      question_text: 'How satisfied are you with our service?',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    },
    {
      id: 2,
      question_text: 'Would you recommend our service to others?',
      options: ['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not'],
    },
  ])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Submit survey
      toast({
        title: 'Survey Completed',
        description: 'Thank you for your feedback! Points have been added to your account.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/dashboard')
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Container maxW="container.md" py={8}>
      <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="base">
        <Progress value={progress} mb={6} colorScheme="blue" />
        <VStack spacing={6} align="stretch">
          <Heading size="md">Question {currentQuestion + 1} of {questions.length}</Heading>
          <Text fontSize="lg">{questions[currentQuestion].question_text}</Text>

          <RadioGroup
            onChange={handleAnswer}
            value={answers[questions[currentQuestion].id]}
          >
            <Stack spacing={4}>
              {questions[currentQuestion].options.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <Button
            colorScheme="blue"
            onClick={handleNext}
            isDisabled={!answers[questions[currentQuestion].id]}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit Survey'}
          </Button>
        </VStack>
      </Box>
    </Container>
  )
}

export default SurveyDetail
