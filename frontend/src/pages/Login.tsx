import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Container,
  useColorModeValue,
  Link as ChakraLink,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../App'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      // Pass email as username since the backend expects username
      await login(formData.email, formData.password)
      navigate('/surveys')
    } catch (err: any) {
      if (err.message) {
        setError(err.message)
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail)
      } else {
        setError('An error occurred while trying to log in. Please try again.')
      }
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }}>
      <Stack spacing="8">
        <Stack spacing="6" textAlign="center">
          <Heading size="lg">Log in to your account</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Start earning points by taking surveys
          </Text>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>
              <Button 
                type="submit" 
                colorScheme="blue" 
                size="lg" 
                fontSize="md"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </Box>
        <Text textAlign="center">
          Don't have an account?{' '}
          <ChakraLink as={RouterLink} to="/register" color="blue.500">
            Sign up
          </ChakraLink>
        </Text>
      </Stack>
    </Container>
  )
}

export default Login
