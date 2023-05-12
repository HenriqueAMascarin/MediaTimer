import { SafeAreaView, View } from 'react-native';
import Buttons from './src/components/Buttons/Buttons';
import Timer from './src/components/Timer/Timer';
import Context from './src/components/Context/ContextTimer';

export default function App() {

  return (
    <Context>
      <SafeAreaView style={{ flex: 1 }}>
        <Timer />
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Buttons />
        </View>
      </SafeAreaView>
    </Context>
  );
}


