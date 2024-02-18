import { Route, Routes } from "react-router-dom"
import { AccountEditPage, AccountPage } from "../pages"


export const AccountRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={ <AccountPage /> } />
                <Route path="/edit" element={ <AccountEditPage /> } />



                <Route path="/*" element={ <AccountPage /> } />
            </Routes>
        </>
    )
}
