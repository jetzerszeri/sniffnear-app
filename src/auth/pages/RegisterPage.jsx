import { AddProfilePicture, RegisterForm } from "../components"
import { AuthLayout } from "../layout/AuthLayout"


export const RegisterPage = () => {
  return (
    <AuthLayout title="Registrate">
        {/* <RegisterForm /> */}
        <AddProfilePicture />
    </AuthLayout>
  )
}
