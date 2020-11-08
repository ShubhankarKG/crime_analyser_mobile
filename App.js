import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from './app/Components/HomeScreen';
import Form from './app/Components/Form';
import FIRForm from './app/Components/FIRForm';
import { Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <Provider>
      <SafeAreaProvider >
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="User Form" component={Form} />
            <Drawer.Screen name="Crime Report Form" component={FIRForm} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
    // <Main />
  )
}

export default App;
