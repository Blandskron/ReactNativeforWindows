import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const sections = [
    { name: 'Home', logo: require('../../assets/casa.png') },
    { name: 'Perfil', logo: require('../../assets/perfil.png') },
    { name: 'Compra', logo: require('../../assets/dinero.png') },
    { name: 'Contrato', logo: require('../../assets/contrato.png') },
    { name: 'Configuracion', logo: require('../../assets/pc.png') },
];

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acciones</Text>
            <View style={styles.buttonContainer}>
                {sections.map((section, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button, { backgroundColor: getColor(index) }]}
                    >
                        <Image source={section.logo} style={styles.icon} />
                        <Text style={styles.buttonText}>{section.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const getColor = (index: number) => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0FF33', '#FF33A8'];
    return colors[index % colors.length];
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
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
