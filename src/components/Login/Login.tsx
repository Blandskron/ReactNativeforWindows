import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Login = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleLogin = async () => {
        // Verifica si los campos est�n vac�os
        if (!username || !password) {
            Alert.alert('Error', 'Por favor ingresa tu nombre de usuario y contrase�a.');
            return;
        }

        try {
            // Hacer la solicitud POST al endpoint de login
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Verificar si la respuesta es exitosa
            if (response.ok) {
                const data = await response.json();
                // Puedes almacenar el token en un contexto o almacenamiento local si es necesario
                console.log('Login exitoso, token:', data.token);
                // Navegar a la pantalla principal
                navigation.navigate('Home');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            Alert.alert('Error', 'Hubo un problema al iniciar sesi�n. Intenta de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={[styles.input, isUsernameFocused ? styles.inputFocused : null]} // Aplicar estilo basado en el enfoque
                placeholder="Username"
                placeholderTextColor="#666"
                value={username}
                onChangeText={setUsername}
                onFocus={() => setIsUsernameFocused(true)} // Manejar enfoque
                onBlur={() => setIsUsernameFocused(false)} // Manejar desenfoque
            />
            <TextInput
                style={[styles.input, isPasswordFocused ? styles.inputFocused : null]} // Aplicar estilo basado en el enfoque
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)} // Manejar enfoque
                onBlur={() => setIsPasswordFocused(false)} // Manejar desenfoque
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#888',
    },
    input: {
        width: 250,
        height: 25,
        backgroundColor: '#ffffff',
        borderColor: '#e7ebda',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 5,
        borderRadius: 5,
        color: '#000',
    },
    inputFocused: {
        backgroundColor: '#f0f8ff', // Color cuando el input est� enfocado (blanco invierno)
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Login;
