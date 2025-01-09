'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchParam } from '@/hooks/use-search-param'
import { cn } from '@/lib/utils'
import { SearchIcon, XIcon } from 'lucide-react'
import { useRef } from 'react'

export default function SearchInput() {
  const [, setSearch] = useSearchParam()
  const [value, setValue] = useSearchParam()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue('')
    setSearch('Search')
    inputRef.current?.blur()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValue(value)
    inputRef.current?.blur()
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <form
        className=" relative max-w-[720px] w-full"
        onSubmit={handleSubmit}
      >
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search"
          className={cn(
            'md:text-base placeholder:text-neutral-800',
            'px-14 w-full rounded-full h-[48px]',
            'border-none bg-[#f0f4f8]',
            'focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)]',
            'focus-visible:ring-0 focus-visible:bg-white',
          )}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
            onClick={handleClear}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  )
}
