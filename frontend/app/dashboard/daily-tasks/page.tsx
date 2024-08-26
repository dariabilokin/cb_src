'use client'

import DailyTasks from '@/app/components/DailyTasks'
import Layout from '@/app/components/Layout'
import Selector from '@/app/components/Selector'
import { useState } from 'react'

const DailyTasksComponent: React.FC = () => {
  const weeks = [
    { value: 'Week 1', label: 'Week 1' },
    { value: 'Week 2', label: 'Week 2' },
    { value: 'Week 3', label: 'Week 3' },
  ]

  const tasks = [
    { id: 1, day: 'Monday', date: '2023-10-01', notes: ['Note 1', 'Note 2'] },
    { id: 2, day: 'Tuesday', date: '2023-10-02', notes: ['Note 3'] },
    {
      id: 3,
      day: 'Wednesday',
      date: '2023-10-03',
      notes: ['Note 4', 'Note 5'],
    },
    // Add more tasks as needed
  ]

  return (
    <Layout>
      <header className=" w-full bg-white items-center justify-center h-32 rounded-xl">
        <h2
          className="py-auto my-10 text-5xl text-gray-600  text-center"
          id="primary-heading"
        >
          Daily Tasks
        </h2>
      </header>
      <div className="bg-white  h-screen rounded-xl px-4 py-5">
        <div className="w-1/3 mb-5">
          <Selector options={weeks} />
        </div>
        {/* <DailyTasks tasks={tasks} /> */}
      </div>
    </Layout>
  )
}

export default DailyTasksComponent
