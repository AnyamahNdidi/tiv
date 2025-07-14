import Sidebar from '@/components/Sidebar';
import React from 'react'

export default function layout({children,}:{
    children: React.ReactNode
}) {
  return (

        <div className="min-h-screen flex w-full overflow-x-hidden">
          <Sidebar />
          <main className="flex-1 min-w-0 p-4 overflow-auto">{children}</main>
        </div>


  );
}
