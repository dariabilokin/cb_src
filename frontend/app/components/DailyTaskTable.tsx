import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'
import { addDays, endOfWeek, format, nextDay, startOfWeek } from 'date-fns'
import { PencilIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'

type DailyTaskTableProps = {
  id: number
  date: string
  dayOfWeek: string
  notes: string[]
}

const DailyTaskTable: React.FC<{ tasks: DailyTaskTableProps[] }> = ({
  tasks,
}) => {
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
    'Add i18n internationalization',
    'Add locale context.',
    'Add selector from shadcn ui.',
    'Update tailwind css config after shadcn initialization.',
  ]
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  console.log('start', start, addDays(start, 1))
  const weekDays = []
  return (
    <Table>
      {/* <TableCaption>Your daily tasks</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/6">Day</TableHead>
          <TableHead className="w-1/6">Date</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="w-1/12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {days.map((day, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-gray-600">{day}</TableCell>
            <TableCell className="text-gray-400">{`${format(
              addDays(start, index),
              'yyyy-MM-dd'
            )}`}</TableCell>
            <TableCell className="font-medium">
              <ul>
                {notes.map((note, index) => (
                  <li className="text-gray-400" key={index}>
                    * {note}
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <div className="flex flex-row w-fit">
                <button className=" text-gray-400 hover:text-gray-600">
                  <PencilIcon className="text-gray-400 h-5 w-5" />
                </button>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <TrashIcon className=" h-5 w-5 " />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DailyTaskTable
