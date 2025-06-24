import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native';


// Indicar o endereço do backend
const BASE_URL = 'http://10.81.205.30:3000';

export default function App() {
    // Excluir tudo que tem relação com counter

    /// CRUD em memória
    const [shopping, setShopping] = useState([]);
    const [text, setText] = useState('');
    const [quant, setQuant] = useState (null);
    const [editShoppingId, setEditShoppingId] = useState(null);
    const [editItemText, setEditItemText] = useState('');
    const [editQuant, setEditQuant] = useState (null);

    //Loading... efeito de carregando...
    const [loanding, setLoading] = useState(false); // novo

    //Buscar tudo
    const fetchItems = async () => {
        setLoading(true);
        try {
            // executa o que precisa, se der erro entra no catch
            const response = await fetch(`${BASE_URL}/shopping`);
            const data = await response.json();
            console.log(JSON.stringify(data)); // debug
            setShopping(data);
        } catch(error) {
            // quando ocorre algum erro
            console.error('Error fetching items:', error);
        }finally {
            // termina de executar com sucesso ou com erro (indeoende)
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    // CREATE
    const addItem = async () => {
        if (text.trim() === '' || quant.trim() === '') {
            return;
        } try {
            const response = await fetch(`${BASE_URL}/shopping`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text: text.trim(), quant: quant.trim()})
            });
            if (response.ok) {
                await fetchItems();
                setText('');
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
            const response = await fetch(`${BASE_URL}/shopping/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({text: editItemText, quant: editQuant }),
            });
            if (response.ok) {
                await fetchItems();
                setEditShoppingId(null);
                setEditItemText('');
                setEditQuant('');
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
                            const response = await fetch(`${BASE_URL}/shopping/${id}`, {
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

    // Read -> um unico item e/ou lista de itens
    const renderItem = ({ item }) => {
        if (item.id != editShoppingId) {
            return (
                <View style={styles.item}>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <Text style={styles.itemText}>{item.quant}</Text>
                    <View style={styles.buttons}>
                        <Button
                            title="Edit"
                            onPress={() => {
                                setEditShoppingId(item.id);
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
                  onChangeText={setEditItemText}
                  value={editItemText} 
                  autoFocus />
                  <TextInput
                  style={styles.editInput}
                  onChangeText={setEditQuant}
                  value={editQuant} 
                  keyboardType='numeric' />
                  <Button title='Update' onPress={() => updateItem(item.id)} color={'steelblue'}></Button>
              </View>
            )
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Enter text item"
            />
            <TextInput
                style={styles.input}
                value={quant}
                onChangeText={setQuant}
                placeholder="Enter amount item"
            />
            <Button title="Add Item" onPress={addItem} color={'steelblue'} />
            <FlatList
                data={shopping}
                renderItem={renderItem} // cada item da lista (items) vai ser processado
                keyExtractor={(item) => item.id} // retorna o id do item
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    itemText: {
        flex: 1,
        marginRight: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    editInput: {
        flex: 1,
        marginRight: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

// onPress = OnClick

//steelblue