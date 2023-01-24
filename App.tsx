import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootApp from './RootApp';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <RootApp />
    </SafeAreaProvider>
  );
}

export default App;
