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
    <div className=" h-auto w-[500px]">
      <form
        className="bg-white shadow-xl rounded-xl px-4 py-6 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <h3 className="text-gray-700 text-lg font-bold mb-2">Log in </h3>
        </div>

        <fieldset className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="email"
            {...register('email', { required: true })}
            type="email"
            placeholder="Enter your email"
            required
          />
          {errors.email && <p> Please enter your email.</p>}
          {errors.email && <p>Please provide a valid email.</p>}
        </fieldset>

        <fieldset className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: true,
              // pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
            })}
            placeholder="Enter your password"
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          />
          {errors.email && <p> Please enter a password.</p>}
          {errors.password && (
            <p>
              Please provide a valid password. It should contain at least 1
              number and 1 special character.
            </p>
          )}
        </fieldset>

        <div className="flex items-center justify-center">
          <button
            className=" bg-gray-200 hover:bg-gray-100 text-gray-800 font-bold tracking-wide py-2 px-4 rounded "
            type="submit"
          >
            Submit
          </button>
        </div>

        <div className="text-gray-800 underline text-center mt-5">
          <Link href="/create-account">Click here to register</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
