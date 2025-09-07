import React from 'react'

const AppLayout = ({children}) => {
  return (
    <div className='flex justify-center pt-10'>
        {children}
    </div>
  )
}

export default AppLayout