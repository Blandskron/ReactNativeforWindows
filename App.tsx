import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

import Login from './src/components/Login/Login';
import Home from './src/components/Home/Home';
import Register from './src/components/Register/Register';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Platform.OS === 'windows' ? 'blue' : 'gray',
                    },
                    headerTintColor: Platform.OS === 'windows' ? 'white' : 'black',
                    headerTitleStyle: {
                        fontWeight: Platform.OS === 'windows' ? 'bold' : 'normal',
                    },
                }}
            >
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const WelcomeScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Text style={styles.text}>Bienvenido al Olimpo de los Dioses</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={styles.buttonText}>�Tienes cuenta? Inicia sesi�n</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}
        >
            <Text style={styles.buttonText}>Reg�strate aqu�</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    text: {
        fontSize: 28,
        fontWeight: '600',
        color: '#e0e0e0',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#333',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default App;
