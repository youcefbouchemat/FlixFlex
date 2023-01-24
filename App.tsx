import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Icon} from '@rneui/themed';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>hello world</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
