import { Box, Container, Flex, Grid, Heading } from '@radix-ui/themes'
import Image from 'next/image'
import LoginForm from './components/LoginForm'
import hero from '../public/hero.svg'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col w-full bg-slate-300  items-center justify-between p-24 ">
      <div className=""></div>
      <Grid
        columns="2"
        align="center"
        justify="center"
        className="bg-white min-w-[1000px] min-h-[700px] rounded-2xl "
      >
        <Box
          height="100%"
          width="100%"
          className=" bg-slate-200 
rounded-l-2xl "
        >
          <div className="h-full flex flex-row justify-center items-center">
            <Heading className="text-center text-gray-700 font-bold text-[4.5rem]">
              Welcome to Corporate Buddy
            </Heading>
          </div>
        </Box>
        <LoginForm />
      </Grid>
    </main>
  )
}
