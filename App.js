import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RootNavigator from './navigator/navigator';
export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
