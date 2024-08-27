'use client'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import CalendarSideBar from '../components/CalendarSideBar'
import DayTable from '../components/DayTable'
import { format } from 'date-fns'

const DashboardPage: React.FC = () => {
  const notes = [
    {
      id: 1,
      note: 'Add i18n internationalization',
      order: 1,
    },
    {
      id: 2,
      note: 'Add locale context.',
      tag: 'Feature',
      highlight: false,
      order: 2,
    },
    {
      id: 3,
      note: 'Add selector from shadcn ui.',
      order: 3,
    },
    {
      id: 4,
      note: 'Update tailwind css config after shadcn initialization.',
      order: 4,
    },
  ]
  const [selected, setSelected] = useState<Date>(new Date())

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
        <div className="flex flex-col gap-4 bg-white w-full h-fit rounded-xl p-4">
          <h3>{`${format(selected, 'dd MMM yyyy')}`}</h3>
          <div className="border-2 rounded-xl text-bold text-lg p-3">
            Achievement task
          </div>
          <div className="border-2 rounded-xl text-bold text-lg">
            <DayTable notes={notes} />
          </div>
        </div>
        <CalendarSideBar selected={selected} setSelected={setSelected} />
      </div>
    </Layout>
  )
}

export default DashboardPage
