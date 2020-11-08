import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Form() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.regform}>
                <Text style={styles.header}>User Form</Text>
                <TextInput style={styles.textInput} placeholder="First Name" underlineColorAndroid={'transparent'} />
                <TextInput style={styles.textInput} placeholder="Last Name" underlineColorAndroid={'transparent'} />
                <TextInput style={styles.textInput} placeholder="Age" underlineColorAndroid={'transparent'} />
                {/* <Menu.Item title="Gender" /> */}
                <TextInput style={styles.textInput} placeholder="Phone Number" underlineColorAndroid={'transparent'} />
                <TextInput style={styles.textInput} placeholder="Email ID" underlineColorAndroid={'transparent'} />
                <TextInput style={styles.textInput} placeholder="Address" underlineColorAndroid={'transparent'} />
                <TextInput style={styles.textInput} placeholder="Longitude" underlineColorAndroid={'transparent'} />
                <TextInput style={styles.textInput} placeholder="Latitude" underlineColorAndroid={'transparent'} />
                <TouchableOpacity style={styles.button}>
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
        alignSelf: "stretch",
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