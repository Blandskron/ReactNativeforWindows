import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const Login = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleLogin = async () => {
        // Verifica si los campos están vacíos
        if (!username || !password) {
            Alert.alert('Error', 'Por favor ingresa tu nombre de usuario y contraseña.');
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
            Alert.alert('Error', 'Hubo un problema al iniciar sesión. Intenta de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftPanel}>
                <Image source={require('../../assets/microsoft.svg')} style={styles.logo} />
                <Text style={styles.companyName}>Ilis Solutions</Text>
                <Text style={styles.mission}>
                    Nuestra misión es transformar ideas en soluciones tecnológicas innovadoras, ofreciendo productos de software de alta calidad que optimicen procesos, impulsen el crecimiento de nuestros clientes y mejoren la experiencia del usuario final.
                </Text>
            </View>
            <View style={styles.rightPanel}>
                <Text style={styles.welcomeTitle}>Welcome</Text>
                <Text style={styles.companySubtitle}>IlisSolutions</Text>
                <Text style={styles.loginTitle}>Login</Text>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/user.svg')} style={styles.inputIcon} />
                    <TextInput
                        style={[styles.input, isUsernameFocused ? styles.inputFocused : null]}
                        placeholder="Username"
                        placeholderTextColor="#666"
                        value={username}
                        onChangeText={setUsername}
                        onFocus={() => setIsUsernameFocused(true)}
                        onBlur={() => setIsUsernameFocused(false)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require('../../assets/key.svg')} style={styles.inputIcon} />
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
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.link}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerLink}>No tienes una cuenta? Registrate aquí</Text>
                </TouchableOpacity>
                <Text style={styles.developedBy}>Desarrollado por Ilis Tecnologia</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftPanel: {
        flex: 3,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    rightPanel: {
        flex: 2,
        backgroundColor: '#e7ebda',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    companyName: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    mission: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    companySubtitle: {
        fontSize: 18,
        fontWeight: '300',
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginTitle: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#e7ebda',
        borderWidth: 1,
        borderRadius: 50,
        margin: 5,
        backgroundColor: '#ffffff',
        textAlign: 'center',
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginLeft: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        color: '#000',
        backgroundColor: '#ffffff',
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
        textAlign: 'center',
        width: 250,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    footerText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
    },
    link: {
        marginTop: 50,
    },
    registerLink: {
        color: '#007BFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    developedBy: {
        marginTop: 20,
        fontSize: 12,
        color: '#aaa',
        textAlign: 'center',
    },
});

export default Login;
