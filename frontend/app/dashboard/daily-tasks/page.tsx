'use client'

import { useState } from 'react'

const DailyTasks: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('Week 1')

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  const tasks = [
    { day: 'Monday', date: '2023-10-01', notes: ['Note 1', 'Note 2'] },
    { day: 'Tuesday', date: '2023-10-02', notes: ['Note 3'] },
    { day: 'Wednesday', date: '2023-10-03', notes: ['Note 4', 'Note 5'] },
    // Add more tasks as needed
  ]

  return (
    <div className="block ">
      <header className="bg-gray-100 flex items-center justify-center h-64">
        <h1>Daily Reports</h1>
      </header>
      <div className="my-5">
        <label htmlFor="weekSelector">Select Week: </label>
        <select
          id="weekSelector"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          {weeks.map((week) => (
            <option key={week} value={week}>
              {week}
            </option>
          ))}
        </select>
      </div>
      <table border={1} cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Day of the Week</th>
            <th>Date</th>
            <th>Notes List</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.day}</td>
              <td>{task.date}</td>
              <td>
                <ul>
                  {task.notes.map((note, noteIndex) => (
                    <li key={noteIndex}>{note}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DailyTasks
