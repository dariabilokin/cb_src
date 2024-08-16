import SideBarNavigation from './SideBarNavigation'

type Props = { children: React.ReactNode }

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-6 h-screen bg-stone-50 border-b border-blue-200">
        <aside className="col-start-1 ">
          <SideBarNavigation />
        </aside>
        {/* Content area */}
        <div className="col-start-2 col-end-7 ">
          {/* Main content */}
          <div className="flex flex-1 p-10 h-screen items-stretch overflow-hidden bg-gray-100">
            <main className="flex-1 overflow-y-auto">
              {/* Primary column */}
              <section
                aria-labelledby="primary-heading"
                className="flex h-full min-w-0 flex-1 flex-col lg:order-last gap-y-10"
              >
                {children}
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
export default Layout
