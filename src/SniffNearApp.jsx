import { AuthProvider } from "./auth/context"
import { AppRouter } from "./router/AppRouter"


export const SniffNearApp = () => {
  return (
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
  )
}
