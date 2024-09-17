'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface StoreTokenRequest {
  token: string
  refreshToken: string
}

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: 'accessToken',
    value: request.token,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  })

  cookies().set({
    name: 'refreshToken',
    value: request.refreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  })
}
export async function logout() {
  const cookieStore = cookies()
  console.log('Logout action ', cookieStore.get('accessToken'))
  //   You may want to make a request to your backend to invalidate the token
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieStore.get('accessToken')?.value}`,
      },
      body: JSON.stringify({
        token: cookieStore.get('accessToken')?.value,
      }),
    }
  ).then((res) => {
    return res.json()
  })
  console.log('res LOGOUT', res)
  //   //   Remove the access token cookie
  //   cookieStore.delete('accessToken')
  //   //   Redirect to the login page
  //   redirect('/login')
}
