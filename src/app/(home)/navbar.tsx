import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import SearchInput from './search-input'

export default function Navbar() {
  return (
    <div className="flex items-center justify-between h-full w-full">
      <div className="flex items-center gap-3 shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl font-bold">Docs</h3>
      </div>

      <SearchInput />
      <div className="flex gap-3 items-center pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"

        />
        <UserButton />
      </div>

      <div />
    </div>
  )
}
