'use client'

import * as React from 'react'
// import * as Form from '@radix-ui/react-form'
// import { Button, Card, Heading, Link, Separator, Text } from '@radix-ui/themes'
// import { Label } from '@radix-ui/react-label'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
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

  console.log('URL', process.env.NEXT_PUBLIC_API_URL)

  function onSubmit(data: { [k: string]: FormDataEntryValue }): void {
    console.log(data)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          console.log('success')
        } else {
          console.log('error')
          setServerErrors({ ...serverErrors, email: true })
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
  console.log('errors', JSON.stringify(errors))
  return (
    // <Card className="w-full bg-white m-auto">
    <form
      className="flex flex-col space-y-4 px-6 py-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>Log in </h3>
      <fieldset
        className="flex flex-col justify-start items-start gap-3"
        name="password"
      >
        <label>Email address</label>
        <input
          {...register('email', { required: true })}
          type="email"
          required
          className="border rounded-md border-gray-300 px-2 py-1 w-full"
        />
        {errors.email && <p> Please enter your email.</p>}
        {errors.email && <p>Please provide a valid email.</p>}
      </fieldset>

      <fieldset
        className="flex flex-col justify-start items-start gap-3"
        name="password"
      >
        <label>Password</label>
        <input
          type="password"
          {...register('password', {
            required: true,
            // pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
          })}
          className="border rounded-md border-gray-300 px-2 py-1 w-full"
        />
        {errors.email && <p> Please enter a password.</p>}
        {errors.password && (
          <p>
            Please provide a valid password. It should contain at least 1 number
            and 1 special character.
          </p>
        )}
      </fieldset>

      <button type="submit"> Submit</button>
      {/* <div size="4" orientation="horizontal" /> */}

      <div className="text-center">
        <Link href="/create-account">Click here to register</Link>
      </div>
    </form>
    // </Card>
  )
}

export default LoginForm
