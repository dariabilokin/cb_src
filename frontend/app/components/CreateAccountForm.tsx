'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const CreateAccountForm: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (res.ok) {
          console.log('success')
        } else {
          console.log('error')
        }
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  return (
    <div className=" h-auto w-[500px]">
      <form
        className="bg-white shadow-xl rounded-xl px-4 py-6 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <h3 className="text-gray-700 text-lg font-bold mb-2">
            Create account
          </h3>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className=" bg-gray-200 hover:bg-gray-100 text-gray-800 font-bold tracking-wide py-2 px-4 rounded "
            type="submit"
          >
            Create Account
          </button>
        </div>

        <div className="text-gray-800 underline text-center mt-5">
          <Link href="/login">Back to Log in</Link>
        </div>
      </form>
    </div>
  )
}

export default CreateAccountForm
