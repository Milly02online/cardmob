import React, { useContext, useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from 'react-native';

import CatalogCard from "./CatalogCard";

// Todo: importar o serviço de recuperação do catalog
import { getCatalog } from "../../services/CatalogServices";

const CatalogScreen = ({navigation} : any) => {
    const [catalog, setCatalog] = useState<any[]>([]);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const data = await getCatalog();
                setCatalog(data);
            }
            catch (error) {
                console.error('Erro ao buscar o catálogo', error);
            }
        };
        fetchCatalog();
        console.log(catalog);
    }, []);

    const handleBuyPress = (product : any) => {
        // 1 - Adicionar ao carrinho
        // 2 - ir para a tela do carrinho
        console.log(product);
    };

    const renderItem = ({ item } : any) => (
        <CatalogCard
            product={item}
            onBuyPress={() => handleBuyPress(item)}
        />
    );

    return (
        <View style={styles.container}>
            <Text>Menu</Text>
            <FlatList
            data={catalog}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id.toString()}
            />
        </View>
    );
};
    
export default CatalogScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
    },
});