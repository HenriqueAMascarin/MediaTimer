import ThemeProvider from '@src/components/Utils/Context/ThemeContext';
import Components from './src/components/Components';
import { store } from './src/components/Utils/Redux/store';
import { Provider } from 'react-redux';
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";

export default function App() {

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