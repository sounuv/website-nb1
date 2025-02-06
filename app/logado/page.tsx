import LoggedInUser from "../components/logged-in-user"

export default function LoggedIn() {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome</h1>
      <LoggedInUser />
    </div>
  )
}

