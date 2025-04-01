import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'

const AdminLayout = () => {
  return (
    <div className="w-screen h-screen min-h-full bg-gray-100">
        <div className="w-full mb-[2.5px]">
            <Navbar />
        </div>
        <div className="w-full flex min-h-full">
            <aside className="xl:w-[13%] lg:w-[5%]">
                <Sidebar />
            </aside>
            <main className="xl:w-[87%] lg:w-[95%] p-5 bg-gray-100">
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout