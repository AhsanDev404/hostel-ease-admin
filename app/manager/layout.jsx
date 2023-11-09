import ManagerHeader from '@/components/ManagerHeader'
import ManagerSidebar from '@/components/ManagerSidebar'
import React from 'react'

export default function layout({children}) {
  return (
    <div className="flex">
      <ManagerSidebar />
      <div className="w-full">
        <ManagerHeader />
        {children}
        </div>
    </div>
  )
}
