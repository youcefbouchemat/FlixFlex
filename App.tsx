import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView, Text} from 'react-native';
import {Icon} from '@rneui/themed';
import colors from './assets/colors';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.primaryBackground}}>
        <Text>hello world</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
