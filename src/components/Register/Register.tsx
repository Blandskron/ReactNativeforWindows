import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Register = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const handleRegister = async () => {
        // Verifica si los campos están vacíos
        if (!username || !password || !email) {
            Alert.alert('Error', 'Por favor llena todos los campos.');
            return;
        }

        try {
            // Hacer la solicitud POST al endpoint de registro
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            // Verificar si la respuesta es exitosa
            if (response.ok) {
                const data = await response.json();
                Alert.alert('Éxito', data.message || 'Usuario registrado exitosamente');
                // Navegar a la pantalla de login o a otra pantalla
                navigation.navigate('Login');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Hubo un problema al registrar el usuario.');
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
            Alert.alert('Error', 'Hubo un problema al registrar el usuario. Intenta de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={[styles.input, isUsernameFocused ? styles.inputFocused : null]}
                placeholder="Username"
                placeholderTextColor="#666"
                value={username}
                onChangeText={setUsername}
                onFocus={() => setIsUsernameFocused(true)}
                onBlur={() => setIsUsernameFocused(false)}
            />
            <TextInput
                style={[styles.input, isPasswordFocused ? styles.inputFocused : null]}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
            />
            <TextInput
                style={[styles.input, isEmailFocused ? styles.inputFocused : null]}
                placeholder="Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
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
        marginBottom: 20,
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
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#000',
    },
    inputFocused: {
        backgroundColor: '#f0f8ff',
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

export default Register;
