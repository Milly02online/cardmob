import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useShop } from '../../contexts/ShopContext';

const CartItem = ({ item }: any) => {
  //Para fazer: implementar o context para persistir dados do carrinho
  const { addToCart, removeFromCart } = useShop();

  const handleRemove = ( item: any) => {
    removeFromCart(item.id)
    console.log('item excluído');
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.images}/>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.quantity}>
            <Text style={styles.price}>R$ {(item.price * item.quantity).toFixed(2)}</Text>

            <TouchableOpacity 
                onPress={() => addToCart(item, -1)} 
                style={styles.button}
            >
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

                <Text style={styles.quantityValue}>{item.quantity}</Text>
                
            <TouchableOpacity 
                onPress={() => addToCart(item)} 
                style={styles.button}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => handleRemove(item)} 
                    style={styles.removeButton}
                >
                <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );

}
export default CartItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'darkblue',
    },
    images: {
        width: '50%',
        height: 100,
        borderRadius: 8,
        borderColor: 'darkblue',
        marginRight: 10,
    },
    name: {
        fontSize: 20,
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    price: {
        fontSize: 18,
        color: 'darkblue',
    },
    button: {
        backgroundColor: 'darkblue',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    removeButton: {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
    },
    removeButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    quantityValue: {
        marginHorizontal: 10,
        fontSize: 18,
    },
})