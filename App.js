import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-native-paper';
import Main from './Main';

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
