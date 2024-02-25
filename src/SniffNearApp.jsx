import { useEffect } from "react";
import { AuthProvider } from "./auth/context"
import { useFetchSniffNearApi } from "./hooks"
import { AppRouter } from "./router/AppRouter"
import { SplashScreen } from "./ui";


export const SniffNearApp = () => {

  const { isLoading, connectServer } = useFetchSniffNearApi();

  useEffect(() => {
    connectServer();
  }, [ connectServer ])


  return (
    <AuthProvider>
        {
          isLoading &&
          <SplashScreen />
        }
        <AppRouter />
    </AuthProvider>
  )
}
