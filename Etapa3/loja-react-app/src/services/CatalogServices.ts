// const API_URL = 'http://10.81.205.30:5000';
import Constants from 'expo-constants';

const { apiUrl } = Constants.expoConfig?.extra || {};

export async function getCatalog(): Promise<any[]> {
    console.log(apiUrl)
    try {
        const response = await fetch(`${apiUrl}/api/catalog`);
        const data = await response.json();
        // console.log(data);
        // return Promise.resolve(data.catalog);
        return data.catalog;
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}