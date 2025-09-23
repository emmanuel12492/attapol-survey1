import { Box, Container, Heading, Text, Button, Stack, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.200')

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={20}>
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Share Your Opinion{' '}
            <Text as={'span'} color={'blue.400'}>
              Earn Rewards
            </Text>
          </Heading>
          
          <Text color={textColor} maxW={'3xl'} fontSize="xl">
            Join our community of survey takers and earn points for sharing your valuable feedback.
            Take surveys, earn points, and redeem them for exciting rewards.
          </Text>

          <Stack direction={'row'} spacing={4} pt={4}>
            <Button
              as={RouterLink}
              to="/register"
              rounded={'full'}
              px={6}
              colorScheme={'blue'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.500' }}
            >
              Get Started
            </Button>
            <Button
              as={RouterLink}
              to="/surveys"
              rounded={'full'}
              px={6}
            >
              View Surveys
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Home
