import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

const CalendarSideBar: React.FC = () => {
  const [selected, setSelected] = useState<Date>()

  return (
    <div className="flex flex-col items-center gap-5 w-fit h-fit bg-white rounded-xl py-5 px-5">
      <DayPicker
        mode="single"
        weekStartsOn={1}
        selected={selected}
        onSelect={setSelected}
        defaultMonth={new Date()}
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
