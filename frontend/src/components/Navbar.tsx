import { Box, Flex, Button, Heading, useColorMode, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.900'} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link to="/">
          <Heading size="md">Survey App</Heading>
        </Link>

        <Flex alignItems={'center'}>
          {isAuthenticated && (
            <>
              <Link to="/surveys">
                <Button variant="ghost" mr={3}>
                  Surveys
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button variant="ghost" mr={3}>
                  Dashboard
                </Button>
              </Link>

              <Text mr={4}>Points: {user?.points}</Text>

              <Button onClick={logout} variant="ghost" mr={3}>
                Logout
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login">
                <Button variant="solid" colorScheme="blue" mr={3}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" colorScheme="blue" mr={3}>
                  Register
                </Button>
              </Link>
            </>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
