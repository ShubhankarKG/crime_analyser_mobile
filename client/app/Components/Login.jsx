import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8000/login",
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (!!res.data.jwtToken) {
          localStorage.setItem("token", res.data.jwtToken);
          navigation.navigate("Home")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.regform}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          value={email}
          onChangeText={(val) => setEmail(val)}
          style={styles.textInput}
          placeholder="email"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          value={password}
          textContentType="password"
          onChangeText={(val) => setPassword(val)}
	  secureTextEntry={true}
          style={styles.textInput}
          placeholder="password"
          underlineColorAndroid={"transparent"}
        />
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36485f",
    paddingLeft: 60,
    paddingRight: 60,
  },
  regform: {
    alignSelf: "stretch",
    paddingTop: 100,
  },
  header: {
    fontSize: 24,
    color: "#fff",
    paddingBottom: 30,
    marginBottom: 40,
    borderBottomColor: "#199187",
    borderBottomWidth: 1,
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#f8f8f8",
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59cbbd",
    marginTop: 30,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    padding: 5,
    marginBottom: 10,
  },
});
