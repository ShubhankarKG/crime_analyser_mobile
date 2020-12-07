import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import axios from "axios";

export default function Form({navigation}) {

    const [form, updateForm] = React.useState({
        firstName: "",
        lastName: "",
        contact: "",
        gender: "Male",
        address: "",
        email: "",
        age: "",
        latitude: "",
        longitude: "",
    });

    const [getDetails, toggleGetDetails] = useState(false);

    React.useEffect(() => {
        navigation.openDrawer();
    }, [])

    useEffect(() => {
        if (getDetails && form.address !== "") {
            axios
                .get("http://www.mapquestapi.com/geocoding/v1/address", {
                    params: {
                        key: process.env.REACT_APP_API_KEY,
                        location: form.address,
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
    }, [form.address, getDetails]);

    function handleChange(name, value) {
        updateForm((prevDetails) => {
            return {
                ...prevDetails,
                [name]: value,
            };
        });
    }

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(form);
        axios
            .post("http://localhost:8000/users", form)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.regform}>
                <Text style={styles.header}>User Form</Text>
                <TextInput value={form.firstName} onChangeText={(val) => handleChange('firstName', val)} style={styles.textInput} placeholder="First Name" underlineColorAndroid={'transparent'} />
                <TextInput value={form.lastName} onChangeText={(val) => handleChange('lastName', val)} style={styles.textInput} placeholder="Last Name" underlineColorAndroid={'transparent'} />
                <TextInput value={form.age} onChangeText={(val) => handleChange('age', parseInt(val))} style={styles.textInput} placeholder="Age" underlineColorAndroid={'transparent'} />
                <Picker
                    selectedValue="Male"
                    onValueChange={(itemValue, itemIndex) => { handleChange('gender', itemValue) }}
                >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
                <TextInput value={form.contact} onChangeText={(val) => handleChange('contact', val)} style={styles.textInput} placeholder="Phone Number" underlineColorAndroid={'transparent'} />
                <TextInput value={form.email} onChangeText={(val) => handleChange('email', val)} style={styles.textInput} placeholder="Email ID" underlineColorAndroid={'transparent'} />
                <TextInput value={form.address} onChangeText={(val) => handleChange('address', val)} style={styles.textInput} placeholder="Address" underlineColorAndroid={'transparent'} />
                <TouchableOpacity style={styles.button} onPress={() => toggleGetDetails(true)}>
                    <Text style={styles.btnText}>Get Location</Text>
                </TouchableOpacity>
                <TextInput editable={false} value={form.longitude} style={styles.textInput} placeholder="Longitude" underlineColorAndroid={'transparent'} />
                <TextInput editable={false} value={form.latitude} style={styles.textInput} placeholder="Latitude" underlineColorAndroid={'transparent'} />
                <TouchableOpacity style={styles.button} onPress={submitHandler}>
                    <Text style={styles.btnText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    },
    regform: {
        alignSelf: "stretch",
        paddingTop: 100
    },
    header: {
        fontSize: 24,
        color: "#fff",
        paddingBottom: 30,
        marginBottom: 40,
        borderBottomColor: '#199187',
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
        alignSelf: "flex-start",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#59cbbd",
        marginTop: 30,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",

    }
})