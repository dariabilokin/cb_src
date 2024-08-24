import React from 'react'
import { addDays, endOfWeek, format, nextDay, startOfWeek } from 'date-fns'

import DayTable from './DayTable'

type DailyTaskTableProps = {
  id: number
  date: string
  dayOfWeek: string
  notes: string[]
}

const DailyTasks: React.FC<{ tasks: DailyTaskTableProps[] }> = ({ tasks }) => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
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
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  console.log('start', start, addDays(start, 1))
  return (
    <>
      <div className="flex flex-col gap-10">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-start gap-5">
            <h3 className="text-xl text-gray-600">{`${day} - ${format(
              addDays(start, index),
              'yyyy-MM-dd'
            )}`}</h3>
            <DayTable notes={notes} />
          </div>
        ))}
      </div>
    </>
  )
}

export default DailyTasks
