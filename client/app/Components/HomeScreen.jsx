import * as React from "react";
import { View, Text, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Form from "./Form";
import FIRForm from "./FIRForm";
import Home from "./Home";
import Dashboard from "./Dashboard";

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  const isLoggedIn = !!localStorage.getItem("token");

  const gotoLoginPage = (e) => navigation.navigate("Login");
  const logout = (e) => {
    localStorage.clear();
    navigation.navigate("Home");
  };

  const btntext = !isLoggedIn ? "LOGIN" : "LOGOUT";

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          color="#888"
          title={btntext}
          onPress={isLoggedIn ? logout : gotoLoginPage}
        />
      ),
    });
  }, [navigation]);

  return (
    <Drawer.Navigator initialRouteName={isLoggedIn ? "Dashboard" : "Home"}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="User Form" component={Form} />
      <Drawer.Screen name="Crime Report Form" component={FIRForm} />
      {isLoggedIn && <Drawer.Screen name="Dashboard" component={Dashboard} />}
    </Drawer.Navigator>
  );
}

export default HomeScreen;
