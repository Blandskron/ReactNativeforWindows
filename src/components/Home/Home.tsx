import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Home = () => {
    const [formData, setFormData] = useState({
        rut: '',
        nombres: '',
        apellido_p: '',
        apellido_m: '',
        direccion: '',
    });

    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/clientes/');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreate = async () => {
        try {
            await fetch('http://127.0.0.1:8000/clientes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            setFormData({ rut: '', nombres: '', apellido_p: '', apellido_m: '', direccion: '' });
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://127.0.0.1:8000/clientes/${selectedId}/`, {
                method: 'DELETE',
            });
            setSelectedId('');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdate = async () => {
        if (selectedId) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/clientes/${selectedId}/`);
                const user = await response.json();
                setFormData(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.navItem}>Home</Text>
                <Text style={styles.navItem}>Operaciones</Text>
                <Text style={styles.navItem}>Procesos</Text>
                <Text style={styles.navItem}>Consultas</Text>
                <Text style={styles.navItem}>Informes</Text>
                <Text style={styles.navItem}>Ajustes</Text>
            </View>

            <View style={styles.sidebar}>
                <Button title="Create" color="#007BFF" onPress={handleCreate} />
                <Button title="Update" color="#007BFF" onPress={handleUpdate} />
                <Button title="Delete" color="#DC3545" onPress={handleDelete} />
                <Button title="Read" color="#6C757D" onPress={fetchUsers} />
            </View>

            <View style={styles.main}>

                <View style={styles.section}>
                    <TextInput
                        placeholder="Rut"
                        style={styles.input}
                        value={formData.rut}
                        onChangeText={(text) => setFormData({ ...formData, rut: text })}
                    />
                    <TextInput
                        placeholder="Nombres"
                        style={styles.input}
                        value={formData.nombres}
                        onChangeText={(text) => setFormData({ ...formData, nombres: text })}
                    />
                    <TextInput
                        placeholder="Apellido P."
                        style={styles.input}
                        value={formData.apellido_p}
                        onChangeText={(text) => setFormData({ ...formData, apellido_p: text })}
                    />
                    <TextInput
                        placeholder="Apellido M."
                        style={styles.input}
                        value={formData.apellido_m}
                        onChangeText={(text) => setFormData({ ...formData, apellido_m: text })}
                    />
                    <TextInput
                        placeholder="Dirección"
                        style={styles.input}
                        value={formData.direccion}
                        onChangeText={(text) => setFormData({ ...formData, direccion: text })}
                    />
                </View>

                <View style={styles.section}>
                    <TextInput
                        placeholder="ID Cliente"
                        style={styles.input}
                        value={selectedId}
                        onChangeText={setSelectedId}
                    />
                    <View style={styles.buttonGroup}>
                        <Button title="Ejecutar" color="#28A745" onPress={handleCreate} />
                        <Button title="Eliminar" color="#DC3545" onPress={handleDelete} />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Lista de Clientes</Text>
                <View style={[styles.section, styles.tableHeader]}>
                    <Text style={styles.tableHeaderCell}>Rut</Text>
                    <Text style={styles.tableHeaderCell}>Nombres</Text>
                    <Text style={styles.tableHeaderCell}>Apellido P.</Text>
                    <Text style={styles.tableHeaderCell}>Apellido M.</Text>
                    <Text style={styles.tableHeaderCell}>Dirección</Text>
                </View>
                <View style={styles.section}>
                    {users.map(user => (
                        <View style={styles.dataRow} key={user.id}>
                            <Text style={styles.tableData}>{user.rut}</Text>
                            <Text style={styles.tableData}>{user.nombres}</Text>
                            <Text style={styles.tableData}>{user.apellido_p}</Text>
                            <Text style={styles.tableData}>{user.apellido_m}</Text>
                            <Text style={styles.tableData}>{user.direccion}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: '#343A40',
    },
    navItem: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    sidebar: {
        position: 'absolute',
        top: 60,
        left: 0,
        width: 120,
        padding: 10,
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    main: {
        marginLeft: 130,
        marginTop: 60,
        padding: 10,
        flexDirection: 'column',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#E9ECEF',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        marginBottom: 10,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        color: '#343A40',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        backgroundColor: '#007BFF',
        borderRadius: 4,
    },
    tableHeaderCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    tableData: {
        flex: 1,
        textAlign: 'center',
        color: '#495057',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#495057',
    },
});

export default Home;