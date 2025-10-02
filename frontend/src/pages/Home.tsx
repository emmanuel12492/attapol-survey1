import { Box, Container, Heading, Text, Button, Stack, SimpleGrid, VStack, HStack, Icon, useColorModeValue, Avatar, Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { CheckIcon } from '@chakra-ui/icons'

const StatBox = ({ number, label }: { number: string; label: string }) => (
  <VStack>
    <Text fontSize="4xl" fontWeight="bold" color="#3f51b5">{number}</Text>
    <Text fontSize="lg" color="#3f51b5">{label}</Text>
  </VStack>
)

const FeatureBox = ({ title, description }: { title: string; description: string }) => (
  <VStack
    bg={useColorModeValue('white', 'gray.700')}
    p={6}
    rounded="lg"
    shadow="md"
    height="100%"
    justify="start"
    align="start"
    spacing={4}
    className="MuiCardContent-root css-1qw96cp"
  >
    <Box className="MuiBox-root css-1qm1lh" width="100%" mb={2}></Box>
    <Heading 
      as="h6"
      size="md"
      className="MuiTypography-root MuiTypography-h6 css-1x3ndnu"
      tabIndex={-1}
      style={{
        margin: 0,
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
        color: '#3f51b5'
      }}
    >
      {title}
    </Heading>
    <Text 
      className="MuiTypography-root MuiTypography-body2 css-1ntwyd0"
      color="#3f51b5"
      style={{
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em'
      }}
    >
      {description}
    </Text>
  </VStack>
)

const TestimonialCard = ({ name, amount, quote }: { name: string; amount: string; quote: string }) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    p={6}
    rounded="lg"
    shadow="md"
  >
    <VStack align="start" spacing={4}>
      <HStack spacing={4}>
        <Avatar name={name} />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold" color="#3f51b5">{name}</Text>
          <Text color="#3f51b5">Earned: {amount}</Text>
        </VStack>
      </HStack>
      <Text color="#3f51b5">"{quote}"</Text>
    </VStack>
  </Box>
)

const Home = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('#3f51b5', '#3f51b5')

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16}>
          {/* Hero Section */}
          <Stack spacing={8} alignItems="center" textAlign="center">
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
            >
              Start Earning with{' '}
              <Text as={'span'} color="#3f51b5">
                Attapoll Survey
              </Text>
            </Heading>
            
            <Text color={textColor} maxW={'3xl'} fontSize="xl">
              Join 50,000+ users earning real money daily
            </Text>

            <HStack spacing={4}>
              <HStack>
                <Icon as={CheckIcon} color="#3f51b5" />
                <Text color="#3f51b5">Free to join</Text>
              </HStack>
              <HStack>
                <Icon as={CheckIcon} color="#3f51b5" />
                <Text color="#3f51b5">Instant payouts</Text>
              </HStack>
              <HStack>
                <Icon as={CheckIcon} color="#3f51b5" />
                <Text color="#3f51b5">No experience needed</Text>
              </HStack>
            </HStack>

            <Stack direction={'row'} spacing={4} pt={4}>
              <Button
                as={RouterLink}
                to="/register"
                rounded={'full'}
                px={6}
                bg="#3f51b5"
                color="white"
                _hover={{ bg: '#303f9f' }}
              >
                Start Earning Now
              </Button>
              <Button
                as={RouterLink}
                to="/surveys"
                rounded={'full'}
                px={6}
                variant="outline"
                borderColor="#3f51b5"
                color="#3f51b5"
                _hover={{ bg: '#3f51b5', color: 'white' }}
              >
                View Surveys
              </Button>
            </Stack>
          </Stack>

          {/* Stats Section */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
            <StatBox number="50K+" label="Active Users" />
            <StatBox number="$2M+" label="Total Payouts" />
            <StatBox number="4.9★" label="User Rating" />
          </SimpleGrid>

          {/* Features Section */}
          <VStack spacing={8} width="full">
            <Heading color="#3f51b5">Why Choose Attapoll Survey?</Heading>
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              spacing={8} 
              width="full"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}
            >
              <FeatureBox
                title="High Paying Surveys"
                description="Earn $5-50 per survey - highest rates in the industry"
              />
              <FeatureBox
                title="25% Referral Commission"
                description="Earn lifetime commissions from your referrals"
              />
              <FeatureBox
                title="Instant Payouts"
                description="Get paid within 2-24 hours - no waiting"
              />
              <FeatureBox
                title="No Minimum Threshold"
                description="Withdraw any amount, anytime"
              />
              <FeatureBox
                title="100% Legitimate"
                description="Trusted by 50,000+ users worldwide"
              />
              <FeatureBox
                title="4.9★ Rating"
                description="Rated excellent by our community"
              />
            </SimpleGrid>
          </VStack>

          {/* Testimonials Section */}
          <VStack spacing={8} width="full">
            <Heading color="#3f51b5">Success Stories</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="full">
              <TestimonialCard
                name="Sarah Mwanza"
                amount="Kes 2,000"
                quote="Attapoll Survey changed my life! I earn 2000+ weekly just by sharing my opinions."
              />
              <TestimonialCard
                name="John Kinyua"
                amount="Kes 4,500"
                quote="I'm so glad I found this site! The extra income has helped me pay my bills."
              />
              <TestimonialCard
                name="Maria Lemayan"
                amount="Kes 3,000"
                quote="As a student, this is perfect. I work whenever I want and get paid instantly."
              />
            </SimpleGrid>
          </VStack>

          {/* Call to Action Section */}
          <VStack spacing={8} width="full" py={12}>
            <Button
              as={RouterLink}
              to="/register"
              className="css-fgzssp"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxSizing: 'border-box',
                WebkitTapHighlightColor: 'transparent',
                cursor: 'pointer',
                userSelect: 'none',
                verticalAlign: 'middle',
                appearance: 'none',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                lineHeight: '1.75',
                letterSpacing: '0.02857em',
                textTransform: 'uppercase',
                minWidth: '64px',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
                backgroundColor: '#3f51b5',
                color: 'white',
                px: '48px',
                py: '16px',
                fontSize: '1.2rem',
                fontWeight: 700,
                outline: '0px',
                border: '0px',
                borderRadius: '4px',
                margin: '0px',
                textDecoration: 'none',
                transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                _hover: {
                  backgroundColor: '#303f9f',
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px'
                }
              }}
            >
              Join Now
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Home
