'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  return (

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
