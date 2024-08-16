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
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  console.log('start', start, addDays(start, 1))
  const weekDays = []
  return (
    <Table>
      <TableCaption>Your daily tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/6">Day</TableHead>
          <TableHead className="w-1/6">Date</TableHead>
          <TableHead>Notes</TableHead>
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
            <TableCell className="font-medium">{''}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DailyTaskTable
