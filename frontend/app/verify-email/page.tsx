'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const VerifyEmail = () => {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('Verifying...')
  const token = searchParams.get('token') ?? ''

  console.log(
    '`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`',
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`
  )

  const fetchOfVerifyEmail = async (token: string) => {
    if (token) {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`
      )
      // convert data to json
      const json = await data.json()
      console.log('json', json)
      return json
    }
  }
  useEffect(() => {
    const res = fetchOfVerifyEmail(token)
    console.log('res', res)
    setStatus('success')
  }, [token])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {status === 'success' ? (
          <h1 className="text-2xl font-bold text-green-600">
            Your email has been verified successfully!
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-red-600">
            Invalid or expired verification link.
          </h1>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
