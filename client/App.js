import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/Components/HomeScreen";
import Login from "./app/Components/Login";
import { Appbar, Provider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "react-native";
const Stack = createStackNavigator();

function App() {
  return (
    <Provider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
