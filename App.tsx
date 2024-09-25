import ThemeProvider from '@src/components/Utils/Context/ThemeContext';
import Components from './src/components/Components';
import { store } from './src/components/Utils/Redux/store';
import { Provider } from 'react-redux';
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import { Roboto_500Medium, Roboto_700Bold, Roboto_400Regular, Roboto_300Light, useFonts } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'i18n/i18nBuilder';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    Roboto_500Medium, Roboto_700Bold, Roboto_400Regular, Roboto_300Light,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  mobileAds().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,

    tagForChildDirectedTreatment: true,

    tagForUnderAgeOfConsent: true,

    testDeviceIdentifiers: ["EMULATOR"],
  });
  
  mobileAds().initialize();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Components />
      </ThemeProvider>
    </Provider>
  );
}