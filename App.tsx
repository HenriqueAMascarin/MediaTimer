import Components from './src/components/Components';
import Context from './src/components/Utils/ContextTimer';

export default function App() {

  return (
    <Context>
      <Components/>
    </Context>
  );
}