import {
  Table,
  TableBody,
  TableFooter,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

type DayTableProps = {
  id: number
  note: string
}

const DayTable: React.FC<{ notes: DayTableProps[] }> = ({ notes }) => {
  const [editRowId, setEditRowId] = useState<number | null>(null)
  return (
    // <div className="w-full border border-gray-200 rounded-2xl">
    <Table className="border-gray-200">
      {/* <TableCaption>Your daily tasks</TableCaption> */}
      <TableHeader className="rounded-t-2xl">
        <TableRow>
          <TableHead className="">Note</TableHead>
          <TableHead className="w-1/12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.map((note, index) => (
          <TableRow key={index}>
            {editRowId === note.id ? (
              <TableCell className="font-medium text-gray-600">
                <input
                  type="text"
                  value={note.note}
                  onChange={() => {}}
                  className="w-full"
                />
              </TableCell>
            ) : (
              <TableCell className="font-medium text-gray-600">
                {note.note}
              </TableCell>
            )}

            <TableCell>
              <div className="flex flex-row w-fit">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setEditRowId(note.id)
                  }}
                >
                  <PencilIcon className="text-gray-400 h-5 w-5" />
                </button>
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => {}}
                >
                  <TrashIcon className=" h-5 w-5 " />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <button
              className="w-full text-gray-400"
              onClick={() => console.log('Add new button')}
            >
              + Add new
            </button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    // </div>
  )
}

export default DayTable
