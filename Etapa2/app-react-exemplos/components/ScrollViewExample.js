import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

class ScrollViewExample extends Component {
    state = {
        names: [
            { "name": "Dom", "id": 1 },
            { "name": "Letty", "id": 2 },
            { "name": "Brian", "id": 3 },
            { "name": "Mia", "id": 4 },
            { "name": "Roman", "id": 5 },
            { "name": "Tej", "id": 6 },
            { "name": "Han", "id": 7 },
            { "name": "Gisele", "id": 8 },
            { "name": "Elena", "id": 9 },
            { "name": "Ramsey", "id": 10 },
            { "name": "Hobbs", "id": 11 },
            { "name": "Shaw", "id": 12 }
        ]
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {
                        this.state.names.map((item, index) => (
                            <View
                                key={item.id}
                                style={styles.item}
                            >
                                <Image source={require('../assets/favicon.png')}/>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}

export default ScrollViewExample;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: 'steelblue'
    },
    text: {
        fontWeight: '900',
        fontSize: 20,
        fontFamily: 'cursive',
    }
});