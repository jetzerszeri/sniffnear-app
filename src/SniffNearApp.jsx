import { useEffect, useState } from "react";
import { AuthProvider } from "./auth/context"
import { useFetchSniffNearApi } from "./hooks"
import { AppRouter } from "./router/AppRouter"
import { SplashScreen } from "./ui";


export const SniffNearApp = () => {

  const { connectServer } = useFetchSniffNearApi();
  const [ displaySC, setDisplaySC ] = useState( true );

  useEffect(() => {
    const connected = connectServer();
    if(connected){ setTimeout(() => {
        setDisplaySC(false);
      }, 2000); }
  }, [ connectServer ]);

  


  return (
    <AuthProvider>
        { displaySC && <SplashScreen /> }
        <AppRouter />
    </AuthProvider>
  )
}
