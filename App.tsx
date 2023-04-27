import { View } from 'react-native';
import Buttons from './src/components/Buttons/Buttons';
import Timer from './src/components/Timer/Timer';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Timer />
      <View style={{flex: 1, justifyContent: 'flex-end' ,alignItems: 'center'}}>
        <Buttons />
      </View>
    </View>
  );
}
