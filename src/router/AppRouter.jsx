import { Route, Routes } from "react-router-dom"
import { AuthHomePage, LoginPage, RegisterPage } from "../auth"
import { HomePage } from "../sniffNear"
import { PublicRoutes } from "./PublicRoutes"


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={ <HomePage /> } />

            <Route path="auth/*" element={
              <PublicRoutes>
                  <Routes>
                    <Route path="/*" element={<AuthHomePage />} />
                    <Route path="login" element={ <LoginPage /> } />
                    <Route path="register" element={ <RegisterPage /> } />
                  </Routes>
              </PublicRoutes>
            } />


        </Routes>
    </>
  )
}
