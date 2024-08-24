'use client'
import React from 'react'
import Layout from '../components/Layout'
import CalendarSideBar from '../components/CalendarSideBar'
import DayTable from '../components/DayTable'

const DashboardPage: React.FC = () => {
  const notes = [
    {
      id: 1,
      note: 'Add i18n internationalization',
    },
    { id: 2, note: 'Add locale context.', tag: 'Feature', highlight: false },
    {
      id: 3,
      note: 'Add selector from shadcn ui.',
    },
    {
      id: 4,
      note: 'Update tailwind css config after shadcn initialization.',
    },
  ]
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
      <div className="flex flex-row gap-x-5 w-full h-screen">
        <div className="flex flex-col gap-4 bg-white w-[400px] h-fit rounded-xl p-4">
          <div className="border-2 rounded-xl text-bold text-lg p-3">
            Achievement task
          </div>
          <div className="border-2 rounded-xl text-bold text-lg">
            <DayTable notes={notes} />
          </div>
        </div>
        <CalendarSideBar />
      </div>
    </Layout>
  )
}

export default DashboardPage
