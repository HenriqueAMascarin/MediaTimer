import Components from './src/components/Components';
import { store } from './src/components/Utils/Redux/store';
import { Provider } from 'react-redux/';

export default function App() {

  return (
    <Provider store={store}>
      <Components/>
    </Provider>
  );
}