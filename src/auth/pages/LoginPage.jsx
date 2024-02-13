import { LoginForm } from "../components/LoginForm"
import { AuthLayout } from "../layout/AuthLayout"


export const LoginPage = () => {
  return (
    <AuthLayout title="Iniciar sesión">
        <LoginForm />
    </AuthLayout>
  )
}
