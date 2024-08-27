'use client'
import { addDays, endOfWeek, startOfWeek } from 'date-fns'
import { createContext, useContext, useState } from 'react'

const CurrentWeekContext = createContext<{
  week: Date[]
  start: Date
  end: Date
}>({
  week: [],
  start: new Date(),
  end: new Date(),
})

export function CurrentWeekProvided({
  children,
}: {
  children: React.ReactNode
}) {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  const end = endOfWeek(new Date(), { weekStartsOn: 1 })

  let week = []
  let day = 0
  while (day <= 6) {
    console.log(start)
    week.push(addDays(start, day))
    day += 1
  }
  return (
    <CurrentWeekContext.Provider
      value={{
        start,
        end,
        week,
      }}
    >
      {children}
    </CurrentWeekContext.Provider>
  )
}

export const useCurrentWeek = () => useContext(CurrentWeekContext)
