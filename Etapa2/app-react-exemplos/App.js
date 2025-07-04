import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native';


// Indicar o endereço do backend
const BASE_URL = 'http://10.81.205.30:5000';

export default function App() {

    const [food, setFood] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState (null);
    const [description, setDescription] = useState ('');
    const [editFoodId, setEditFoodId] = useState(null);
    const [editItemName, setEditItemName] = useState('');
    const [editPrice, setEditPrice] = useState (null);
    const [editDescription, setEditDescription] = useState ('');

    const [loanding, setLoading] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/catalog`);
            const data = await response.json();
            console.log(JSON.stringify(data.catalog));
            setFood(data.catalog);
        } catch(error) {
            console.error('Error fetching items:', error);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    // CREATE
    const addItem = async () => {
        if (name.trim() === '' || price.trim() === '' || description.trim() === '') {
            return;
        } try {
            const response = await fetch(`${BASE_URL}/api/catalog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name.trim(), price: price.trim(), description: description.trim()})
            });
            if (response.ok) {
                await fetchItems();
                setName('');
            }else {
                console.error('Failed to add item:', response.status);
            }
        }catch (error) {
            console.error('Error adding item:', error);
        }
    };

    // Update
    const updateItem = async (id) => {
        try {
            const fValue = parseFloat(editPrice)
            const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: editItemName, price: fValue, description: editDescription }),
            });
            if (response.ok) {
                await fetchItems();
                setEditFoodId(null);
                setEditItemName('');
                setEditPrice('');
                setEditDescription('');
            } else {
                console.error('Failed to update item:', response.status);
            }
        } catch (error) {
            console.error('Error updating item', error);
        }
    };

    // Delete
    const deleteItem = async (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
                                method: 'DELETE'
                            });
                            if (response.ok) {
                                await fetchItems();
                            } else {
                                console.error('Failed to delete item:', response.status);
                            }
                        } catch (error) {
                            console.error('Error deleting item:', error);
                        }
                    },
                }
            ],
            { cancelable: true }
        )
    };

    // Read
    const renderItem = ({ item }) => {
        if (item.id != editFoodId) {
            return (
                <View style={styles.item}>
                    <Image 
                        source={{ uri: item.image }}
                        style={{ width: 280, height: 200, borderRadius: 10, marginBottom: 10 }}
                    />
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>R$ {item.price}</Text>
                    <Text style={styles.itemText}>{item.description}</Text>
                    <View style={styles.buttons}>
                        <Button
                            title="Edit"
                            onPress={() => {
                                setEditFoodId(item.id);
                                setEditItemName(item.name);
                                setEditPrice(item.price.toString());
                                setEditDescription(item.description);
                            }}
                            color={'steelblue'}
                        ></Button>
                        <Button
                            title="Delete"
                            onPress={() => deleteItem(item.id)}
                            color={'steelblue'}
                        ></Button>
                    </View>
                </View>
            );
        } else {
            // Um item está sendo editado
            return (
              <View style={styles.item}>
                <TextInput
                  style={styles.editInput}
                  onChangeText={setEditItemName}
                  value={editItemName} 
                />
                <TextInput
                  style={styles.editInput}
                  onChangeText={setEditPrice}
                  value={editPrice} 
                  keyboardType='numeric' 
                />
                <TextInput
                  style={styles.editInput}
                  onChangeText={setEditDescription}
                  value={editDescription} 
                />
                <Button 
                    title='Update' 
                    onPress={() => updateItem(item.id)} 
                    color={'steelblue'}>
                </Button>
              </View>
            )
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter text item"
            />
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description item"
            />
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price item"
            />
            <Button title="Add Item" onPress={addItem} color={'steelblue'} />
            <FlatList
                data={food}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        marginTop: 50,
        padding: 20,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'cursive',
        flexDirection: 'row',
    },
    buttonContainer: {
        marginTop: 12,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    itemText: {
        textAlign: 'center',
        marginVertical: 2,
        fontSize: 14,
        color: '#333',
    },
    itemTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        marginBottom: 4,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
        gap: 10,
    },
    editInput: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 8,
    },
});

// onPress = OnClick

//steelblue