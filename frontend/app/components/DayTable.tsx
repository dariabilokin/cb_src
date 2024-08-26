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
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

type DayTableProps = {
  id: number
  note: string
  order: number
}
const DayTable: React.FC<{ notes: DayTableProps[] }> = ({ notes }) => {
  const [editRowId, setEditRowId] = useState<number | null>(null)
  const [noteChanging, setNoteChanging] = useState<string>('')
  const [noteList, setNoteList] = useState<DayTableProps[]>(notes)

  console.log('noteChanging', noteChanging)
  return (
    <Table className="border-gray-200">
      <TableHeader className="rounded-t-2xl">
        <TableRow>
          <TableHead>Note</TableHead>
          <TableHead className="w-1/12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {noteList.map((note, index) => (
          <TableRow key={index} className="h-14">
            {editRowId === note.id ? (
              <TableCell className="py-0 px-2 font-medium text-gray-600">
                <input
                  type="text"
                  defaultValue={note.note}
                  onChange={(e) => {
                    setNoteChanging(e.target.value)
                  }}
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </TableCell>
            ) : (
              <TableCell className="h-10 font-medium text-gray-600">
                {note.note}
              </TableCell>
            )}

            <TableCell>
              <div className="flex flex-row w-fit">
                {editRowId != note.id ? (
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setEditRowId(note.id)
                    }}
                  >
                    <PencilIcon className="text-gray-400 h-5 w-5" />
                  </button>
                ) : (
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setEditRowId(null)
                      setNoteList((prevNotes) => {
                        const updatedNotes = prevNotes.map((item) =>
                          item.id === note.id
                            ? { ...item, note: noteChanging }
                            : item
                        )
                        return updatedNotes.sort((a, b) => a.order - b.order)
                      })
                    }}
                  >
                    <CheckCircleIcon className="text-gray-400 h-5 w-5" />
                  </button>
                )}
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    console.log('delete button')
                    setNoteList((prevNotes) =>
                      prevNotes.filter((item) => item.id !== note.id)
                    )
                  }}
                >
                  <TrashIcon className=" h-5 w-5 " />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <button
              className="w-full text-gray-400"
              onClick={() => {
                console.log('Add new button')
                const id = Math.floor(Math.random() * 100)
                setNoteList((prevNotes) => [
                  ...prevNotes,
                  {
                    id: id,
                    note: '',
                    order: prevNotes.length,
                  },
                ])
                setEditRowId(id)
              }}
            >
              + Add new
            </button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default DayTable
