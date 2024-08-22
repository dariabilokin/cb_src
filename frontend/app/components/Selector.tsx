import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const Selector: React.FC<{
  options: { value: string; label: string }[]
}> = ({ options }) => {
  const [selectedWeek, setSelectedWeek] = useState<string>('Week 1')
  return (
    <Select
      onValueChange={(data: string) => {
        setSelectedWeek(data)
      }}
      defaultValue={selectedWeek}
    >
      <SelectTrigger className="w-[180px] text-gray-600">
        <SelectValue className="text-gray-600" placeholder="Select Week" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem
            className="text-gray-600"
            key={index}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export default Selector
