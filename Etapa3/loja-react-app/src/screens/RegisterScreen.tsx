import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView} from "react-native";

import { requestRegister } from "../services/authService"; // modificado
// import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation } : any) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = useState('');


    // RECUPERAÇÃO
    const handleRegister = async () => {
        try {
            // Lógica de cadastro / conexão com backend.
            const token = await requestRegister(name, email, password); // modificado
            // login(token);
            console.log('Cadastro ok'); // modificado
            // navigation.navigate('Login');
        } catch (err: any) {
            setError(err);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        <View>
            {/* Novo campo "nome" */}
            <Text>Nome:</Text>
            <TextInput 
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            <Text>Email:</Text>
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <Text>Senha:</Text>
            <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            { error ? 
                <Text 
                    style={{ color: 'red'}}
                >
                {error}
                </Text> :
                null
            }
             {/* botões modificados */}
            <Button title="Cadastrar" onPress={handleRegister} /> 
            <Button title="Já tem conta ? Faça o Login" onPress={ () => navigation.navigate('Login') }/>

        </View>
        </SafeAreaView>
    );


    // AVALIAÇÃO
    // function handleRegister() {
    //     const userData = {
    //         name,
    //         email,
    //         password,
    //     };
    //     console.log('Perfil:', userData);

    //     fetch('http://10.81.205.30:5000/api/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(userData),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 return response.text().then((text) => {
    //                     throw new Error(
    //                         `Erro da API: ${response.status} - ${text}`
    //                     );
    //                 });
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log('Usuário:', data);
    //             alert('Cadastro realizado');
    //             setName('');
    //             setEmail('');
    //             setPassword('');
    //         })
    //         .catch((error) => {
    //             console.error('Erro ao cadastrar:', error);
    //             alert('Erro ao cadastrar, tente novamente.');
    //         });
    // }

    // return (
    //     <View style={styles.container}>
    //         <View>
    //             <Text style={styles.title}>Cadastre-se</Text>
    //             <TextInput
    //                 style={styles.input}
    //                 placeholder="Nome:"
    //                 value={name}
    //                 onChangeText={setName}
    //             />
    //             <TextInput
    //                 style={styles.input}
    //                 placeholder="Email:"
    //                 value={email}
    //                 onChangeText={setEmail}
    //                 keyboardType="email-address"
    //             />
    //             <TextInput
    //                 style={styles.input}
    //                 placeholder="Senha:"
    //                 value={password}
    //                 onChangeText={setPassword}
    //                 secureTextEntry
    //             />
    //             <TouchableOpacity 
    //                 style={styles.button} 
    //                 onPress={handleRegister}
    //             >
    //                 <Text style={styles.buttonText}>Cadastrar</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // );
}

//RECUPERAÇÃO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
    }
});

// AVALIAÇÃO
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 8,
//         marginBottom: 12,
//     },
//     title: {
//         paddingBottom: 10,
//         fontSize: 20,
//         color: 'darkblue',
//     },
//     button: {
//         backgroundColor: 'darkblue',
//         borderRadius: 5,
//         padding: 5,
//         marginHorizontal: 5,
//     },
//     buttonText: {
//         fontSize: 16,
//         color: '#fff',
//     },
// })