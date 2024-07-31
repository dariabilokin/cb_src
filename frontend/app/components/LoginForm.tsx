'use client'

import * as React from 'react'
import * as Form from '@radix-ui/react-form'
import { Button, Card, Heading, Link, Separator, Text } from '@radix-ui/themes'
import { Label } from '@radix-ui/react-label'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
const LoginForm: React.FC = () => {
  const [serverErrors, setServerErrors] = React.useState({
    email: false,
    password: false,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } })

  function onSubmit(data: { [k: string]: FormDataEntryValue }): void {
    console.log(data)
  }
  console.log('errors', JSON.stringify(errors))
  return (
    // <Card className="w-full bg-white m-auto">
    <form
      className="flex flex-col space-y-4 px-6 py-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>Log in </Heading>
      <fieldset
        className="flex flex-col justify-start items-start gap-3"
        name="password"
      >
        <Label>Email address</Label>
        <input
          {...register('email', { required: true })}
          type="email"
          required
          className="border rounded-md border-gray-300 px-2 py-1 w-full"
        />
        {errors.email && <Text> Please enter your email.</Text>}
        {errors.email && <Text>Please provide a valid email.</Text>}
      </fieldset>

      <fieldset
        className="flex flex-col justify-start items-start gap-3"
        name="password"
      >
        <Label>Password</Label>
        <input
          type="password"
          required
          className="border rounded-md border-gray-300 px-2 py-1 w-full"
        />
        {errors.email && <Text> Please enter a password.</Text>}
        {errors.password && (
          <Text>
            Please provide a valid password. It should contain at least 1 number
            and 1 special character.
          </Text>
        )}
      </fieldset>

      <Button> Submit</Button>
      <Separator size="4" orientation="horizontal" />

      <div className="text-center">
        <Link href="/createAccount" underline="always">
          Click here to register
        </Link>
      </div>
    </form>
    // </Card>
  )
}

export default LoginForm
