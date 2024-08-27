import CreateAccountForm from '../components/CreateAccountForm'

export default function Home() {
  return (
    <>
      <div className="relative h-screen w-full bg-slate-300 flex flex-col items-center justify-center">
        <CreateAccountForm />
      </div>
    </>
  )
}
