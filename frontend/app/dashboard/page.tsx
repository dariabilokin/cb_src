import React from 'react'
import Layout from '../components/Layout'

const DashboardPage: React.FC = async () => {
  return (
    <Layout>
      <header className=" w-full bg-white justify-center text-center h-32 rounded-xl">
        <h2
          className="py-auto my-10 text-5xl text-gray-600  text-center"
          id="primary-heading"
        >
          Dashboard
        </h2>
      </header>
      <div className="bg-white w-full h-screen rounded-xl"></div>
    </Layout>
  )
}

export default DashboardPage
