import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';

import CartItem from "./CartItem";
import { useShop } from "../../contexts/ShopContext";

const CartScreen = ({ navigation }: any) => {
    const { cartItems, getTotalPrice, clearCart } = useShop();

    const renderItem = ({item} : any) => (
        <CartItem item={item}/>
    );

    const handleCheckout = () => {
        console.log('Concluindo a compra');
    }

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <View style={styles.container}>
                    <Text style={styles.empty}>Seu carrinho está vazio</Text>
                <Button
                    title= 'Ver produtos'
                    onPress={ () => navigation.navigate('Catalog')}
                />
                </View>
                
                ) : (
                    <View style={styles.listContainer}>
                        <Text>Carrinho de compras</Text>
                        <FlatList 
                            data={cartItems}
                            renderItem={renderItem}
                            keyExtractor={(item: any) => item.id.toString()}
                        />

                        <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total R$ {getTotalPrice().toString()}</Text>
                            <TouchableOpacity
                                onPress={clearCart}
                                style={styles.clearButton}
                            >
                                <Text style={styles.clearButtonText}>Limpar carrinho</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('Catalog')}
                                style={styles.continueButton}
                            >
                                <Text style={styles.continueButtonText}>Continuar comprando</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('Checkout')}
                                style={styles.checkoutButton}
                            >
                                <Text style={styles.checkoutButtonText}>Concluir pedido</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            
        </View>
    )

}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        fontSize: 18,
        marginBottom: 20,
    },
    listContainer: {
        flex: 1,
    },
    totalContainer: {
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'lightblue',
        borderTopColor: 'darkblue',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    clearButton: {
        marginTop: 10,
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    clearButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    continueButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        padding: 10,
    },
    continueButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    checkoutButton: {
        marginTop: 10,
        backgroundColor: "blue",
        borderRadius: 5,
        padding: 10,
    },
    checkoutButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
})