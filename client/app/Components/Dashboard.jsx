import React, { useEffect } from "react";
import { View } from "react-native";

function Dashboard({ navigation }) {
  useEffect(() => {
    navigation.openDrawer();
  }, []);

  return <View></View>;
}

export default Dashboard;
