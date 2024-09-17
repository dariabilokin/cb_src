import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

const CalendarSideBar: React.FC<{
  selected: Date
  setSelected: React.Dispatch<React.SetStateAction<Date>>
}> = ({
  selected,
  setSelected,
}: {
  selected: Date
  setSelected: React.Dispatch<React.SetStateAction<Date>>
}) => {
  return (
    <div className="flex flex-col items-center gap-5 w-full h-fit bg-white rounded-xl py-5 px-5 ">
      <DayPicker
        mode="single"
        weekStartsOn={1}
        selected={selected}
        onSelect={setSelected}
        defaultMonth={new Date()}
        className="border-0"
        classNames={{
          vhidden: 'sr-only',
          caption: 'flex justify-center items-center h-10',
          root: 'text-gray-800',
          months: 'flex gap-4 relative px-4 py-2 justify-center items-center',
          caption_label: 'text-xl px-1',
          nav_button:
            'inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100',
          nav_button_next: 'right-0',
          nav_button_previous: 'left-0',
          table: 'border-collapse border-spacing-0',
          head_cell: 'w-10 h-10 uppercase align-middle text-center',
          cell: 'w-10 h-10 align-middle text-center border-0 px-0',
          day: 'rounded-full w-10 h-10 transition-colors hover:bg-sky-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-300 focus-visible:ring-opacity-50 active:bg-sky-600 active:text-white',
          day_selected: 'text-white bg-sky-500 hover:bg-sky-500',
          day_today: 'font-bold',
          day_disabled:
            'opacity-25 hover:bg-white active:bg-white active:text-gray-800',
          day_outside: 'enabled:opacity-50',
          day_range_middle: 'rounded-none',
          day_range_end: 'rounded-l-none rounded-r-full',
          day_range_start: 'rounded-r-none rounded-l-full',
          day_hidden: 'hidden',
        }}
      />
      <button
        className="border-gray-200 border-2 rounded-lg py-1 px-2 text-gray-800 text-bold w-fit text-center"
        onClick={() => setSelected(new Date())}
      >
        Today
      </button>
    </div>
  )
}

export default CalendarSideBar
