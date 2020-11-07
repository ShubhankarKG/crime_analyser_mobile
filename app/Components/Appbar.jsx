import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const AppBar = ({ title, toggleDrawer, drawer }) => (
    <Appbar style={styles.top}>
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon="menu" onPress={() => toggleDrawer(!drawer)} />
            <Appbar.Content title={title} />
        </Appbar.Header>
    </Appbar>
);

export default AppBar

const styles = StyleSheet.create({
    top: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        flex: 1,
        alignItems: "stretch"
    },
    header: {
        fontSize: 24,
        color: "#fff",
    }
});