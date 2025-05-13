import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    FlatList,
} from 'react-native';

import List  from './components/List';

export default function App() {
    return (
        <View style={styles.container}>
           <List/>
           <View style={styles.redbox}/>
           <View style={styles.bluebox}/>
           <View style={styles.blackbox}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 600,
        marginTop: 150,
    },
    redbox: {
        backgroundColor: 'maroon',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    bluebox: {
        backgroundColor: 'navy',
        width: 100,
        height: 100,
    },
    blackbox: {
        backgroundColor: 'black',
        width: 100,
        height: 100,
    },
});

// onPress = OnClick

//steelblue