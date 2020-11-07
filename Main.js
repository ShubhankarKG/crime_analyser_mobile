import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Form from './app/Components/Form';
import FIRForm from "./app/Components/FIRForm"
import AppBar from './app/Components/Appbar';
import { Drawer } from 'react-native-paper';

function Main() {

  const [step, setStep] = useState(0);
  const [drawer, toggleDrawer] = useState(false);
  const [appbarText, setAppbarText] = useState("User Form");

  return (
    <>
      {drawer && <Drawer.Section title="Some title">
        <Drawer.Item
          label="User Form"
          active={step === 0}
          onPress={() => {
            setStep(0);
            setAppbarText("User Form");
          }}
        />
        <Drawer.Item
          label="Crime Report Form"
          active={step === 1}
          onPress={() => {
            setStep(1);
            setAppbarText("Crime Report Form");
          }}
        />
      </Drawer.Section>
      }
      <View style={styles.container}>
        <AppBar title={appbarText} toggleDrawer={toggleDrawer} drawer={drawer} />
        {step === 1 && <FIRForm />}
        {step === 0 && <Form />}
      </View>
    </>
  )
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36485f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60
  },
});
