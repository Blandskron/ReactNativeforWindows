import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Login from './src/components/Login/Login';
import Home from './src/components/Home/Home';
import Register from './src/components/Register/Register';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    options={{ headerShown: false }}
                >
                    {(props) => (
                        <SafeAreaView style={styles.container}>
                            <ScrollView contentContainerStyle={styles.scrollContainer}>
                                <View style={styles.container}>
                                    <Image source={require('./src/assets/olimpo.png')} style={styles.image} />
                                    <Text style={styles.title}>Olimpo Mundial</Text>
                                    <Login {...props} />
                                    <TouchableOpacity
                                        style={styles.link}
                                        onPress={() => props.navigation.navigate('Register')}
                                    >
                                        <Text style={styles.linkText}>No tienes una cuenta? Registrate aquí</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.footer}>Desarrollado por Ilis Tecnologia</Text>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    )}
                </Stack.Screen>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lighter,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 500,
        height: 250,
        marginBottom: 0,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#888',
    },
    footer: {
        marginTop: 5,
        fontSize: 11,
        color: '#888',
    },
    link: {
        marginTop: 50,
    },
    linkText: {
        color: '#007BFF',
    },
});

export default App;
