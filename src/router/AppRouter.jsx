import { Route, Routes } from "react-router-dom"
import { AuthHomePage, LoginPage, RegisterPage } from "../auth"
import { HomePage } from "../sniffNear"


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={ <HomePage /> } />

            <Route path="auth" element={ <AuthHomePage /> } />
            <Route path="login" element={ <LoginPage /> } />
            <Route path="register" element={ <RegisterPage /> } />
        </Routes>
    </>
  )
}
