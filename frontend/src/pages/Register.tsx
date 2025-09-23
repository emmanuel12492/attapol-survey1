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
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement registration logic
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }}>
      <Stack spacing="8">
        <Stack spacing="6" textAlign="center">
          <Heading size="lg">Create an account</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Join our community and start earning rewards
          </Text>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
        <Text textAlign="center">
          Already have an account?{' '}
          <ChakraLink as={RouterLink} to="/login" color="blue.500">
            Sign in
          </ChakraLink>
        </Text>
      </Stack>
    </Container>
  )
}

export default Register
