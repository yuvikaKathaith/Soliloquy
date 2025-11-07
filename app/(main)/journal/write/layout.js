import Link from 'next/link'
import React, { Suspense } from 'react'
import {BarLoader} from "react-spinners"

const WriteLayout = ({children}) => {
  return (
    <div className='container mx-auto py-10 px-30'>
        <div>
            <Link
                href="/dashboard"
                className="text-sm font-inter font-semibold text-orange-600 hover:text-orange-700 cursor pointer"
            >
                ← Back to Dashboard
            </Link>
            {/* Show this fallback while React waits for something (data, code, or a component) to load */}
            <Suspense fallback={<BarLoader color="orange" width={"100%"}/>}>{children}</Suspense>
        </div>
    </div>
  )
}

export default WriteLayout