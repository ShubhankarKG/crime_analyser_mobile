import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

export default function FIRForm({ navigation }) {
  const [form, updateForm] = useState({
    name: "",
    fathersName: "",
    address: "",
    contact: "",
    email: "",
    place_of_occurrence: "",
    offence_desc: "",
    offenceSection: "",
    latitude: "",
    longitude: "",
  });
  const [getDetails, toggleGetDetails] = useState(false);

  useEffect(() => {
    if (getDetails && form.place_of_occurrence !== "") {
      axios
        .get("http://www.mapquestapi.com/geocoding/v1/address", {
          params: {
            key: process.env.REACT_APP_API_KEY,
            location: form.place_of_occurrence,
          },
        })
        .then((res) => {
          const { lat, lng } = res.data.results[0].locations[0].latLng;
          updateForm((prevDetails) => ({
            ...prevDetails,
            latitude: lat,
            longitude: lng,
          }));
        })
        .catch((err) => {
          console.log("ERR: ", err.toString());
        });
    }
  }, [form.place_of_occurrence, getDetails]);

  const handleChange = (name, value) => {
    updateForm((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  React.useEffect(() => {
    navigation.openDrawer();
  }, []);

  const submitHandler = (event) => {
    axios
      .post("http://localhost:8000/crime_reports", form)
      .then((res) => {
        console.log(res);
        navigation.navigate("Home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.regform}>
        <Text style={styles.header}>Crime Report Form</Text>
        <Text style={styles.text}>
          Personal Details of the Complainant/Informant{" "}
        </Text>
        <TextInput
          value={form.name}
          onChangeText={(val) => handleChange("name", val)}
          style={styles.textInput}
          placeholder="Name"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          value={form.fathersName}
          onChangeText={(val) => handleChange("fathersName", val)}
          style={styles.textInput}
          placeholder="Father's/Husband's Name"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          value={form.contact}
          onChangeText={(val) => handleChange("contact", val)}
          style={styles.textInput}
          placeholder="Phone Number"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          value={form.email}
          onChangeText={(val) => handleChange("email", val)}
          style={styles.textInput}
          placeholder="Email ID"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          value={form.address}
          onChangeText={(val) => handleChange("address", val)}
          style={styles.textInput}
          placeholder="Address"
          underlineColorAndroid={"transparent"}
        />
        <Text style={styles.text}>Place Of Occurrence</Text>
        <TextInput
          value={form.place_of_occurrence}
          onChangeText={(val) => handleChange("place_of_occurrence", val)}
          style={styles.textInput}
          placeholder="Place"
          underlineColorAndroid={"transparent"}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleGetDetails(true)}
        >
          <Text style={styles.btnText}>Get Location</Text>
        </TouchableOpacity>
        <TextInput
          editable={false}
          value={form.longitude}
          style={styles.textInput}
          placeholder="Longitude"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          editable={false}
          value={form.latitude}
          style={styles.textInput}
          placeholder="Latitude"
          underlineColorAndroid={"transparent"}
        />
        <Text style={styles.text}>Offence</Text>
        <TextInput
          value={form.offence_desc}
          onChangeText={(val) => handleChange("offence_desc", val)}
          style={styles.textInput}
          placeholder="Nature of Offence"
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          value={form.offenceSection}
          onChangeText={(val) => handleChange("offenceSection", val)}
          style={styles.textInput}
          placeholder="Section"
          underlineColorAndroid={"transparent"}
        />
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.btnText}>SUBMIT</Text>
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
