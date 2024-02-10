import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { HomePage } from "../sniffNear"


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="login" element={ <LoginPage /> } />
        </Routes>
    </>
  )
}
