import React from 'react'
import Link from 'next/link'
import {
  HomeIcon,
  CalendarIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import { logout } from '../lib/actions'
import { Bars3Icon } from '@heroicons/react/24/outline'

const SideBarNavigation: React.FC = () => {
  const handleLogout = async () => {
    try {
      await logout()
      // The logout action will handle the redirect if successful
    } catch (error) {
      console.error('Logout failed:', error)
      // Handle the error, maybe show a notification to the user
      alert('Logout failed. Please try again.')
    }
  }
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 bg-white h-full border-r w-[56px] md:w-[150px]">
        <div className="flex flex-row items-center justify-center h-14 border-b">
          {/* <span className="inline-flex justify-center items-center">
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          </span> */}
          <span className="tracking-wide font-medium mx-auto text-gray-700 text-xl hidden md:block">
            Corporate Buddy
          </span>
          <span className="tracking-wide font-medium mx-auto text-gray-700 text-xl block md:hidden">
            CB
          </span>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <a
                href="/dashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <HomeIcon className="h-5 w-5 text-gray-600" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate hidden md:block">
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <CalendarIcon className="h-5 w-5 text-gray-600" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate hidden md:block">
                  Weekly Reports
                </span>
                {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                  New
                </span> */}
              </a>
            </li>
            <li>
              <Link
                href="/dashboard/daily-tasks"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <ClipboardIcon className="h-5 w-5 text-gray-600" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate hidden md:block">
                  Daily Tasks
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500 ">
                  Settings
                </div>
              </div>
            </li>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate hidden md:block">
                  Profile
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate hidden md:block">
                  Settings
                </span>
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleLogout()}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate hidden md:block">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBarNavigation
