import ThemeProvider from "@src/components/Utils/Context/ThemeContext";
import Components from "@src/components/Components";
import { store } from "@src/components/Utils/Redux/store";
import { Provider } from "react-redux";

import {
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_300Light,
  useFonts,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "i18n/i18nBuilder";
import notifee from "@notifee/react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_300Light,
  });

  useEffect(() => {
    if (loaded || error) {
      (async () => {
        await notifee.cancelAllNotifications();

        await notifee
          .getChannels()
          .then((response) =>
            response.forEach(
              async (element) => await notifee.deleteChannel(element.id)
            )
          );

        SplashScreen.hideAsync();
      })();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <Provider store={store}>
        <Components />
      </Provider>
    </ThemeProvider>
  );
}
