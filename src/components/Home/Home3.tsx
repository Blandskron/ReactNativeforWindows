import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../utils/api';


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

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const handleCreate = async () => {
        try {
            await createUser(formData);
            clearForm();
            loadUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdate = async () => {
        if (selectedId) {
            try {
                await updateUser(selectedId, formData);
                clearForm();
                loadUsers();
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(selectedId);
            clearForm();
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const clearForm = () => {
        setFormData({ rut: '', nombres: '', apellido_p: '', apellido_m: '', direccion: '' });
        setSelectedId('');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.main}>
                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Formulario de Cliente</Text>
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
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.button} onPress={handleCreate}>
                            <Text style={styles.buttonText}>Crear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Actualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Lista de Clientes</Text>
                <View style={[styles.section, styles.tableHeader]}>
                    <Text style={styles.tableHeaderCell}>ID</Text>
                    <Text style={styles.tableHeaderCell}>Rut</Text>
                    <Text style={styles.tableHeaderCell}>Nombres</Text>
                    <Text style={styles.tableHeaderCell}>Apellido P.</Text>
                </View>

                {users.map(user => (
                    <TouchableOpacity key={user.id} style={styles.dataRow} onPress={() => {
                        setSelectedId(user.id);
                        setFormData({
                            rut: user.rut,
                            nombres: user.nombres,
                            apellido_p: user.apellido_p,
                            apellido_m: user.apellido_m,
                            direccion: user.direccion,
                        });
                    }}>
                        <Text style={styles.tableData}>{user.id}</Text>
                        <Text style={styles.tableData}>{user.rut}</Text>
                        <Text style={styles.tableData}>{user.nombres}</Text>
                        <Text style={styles.tableData}>{user.apellido_p}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    main: {
        flex: 1,
        padding: 15,
    },
    formSection: {
        marginBottom: 20,
        backgroundColor: '#E9ECEF',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#343A40',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        color: '#343A40',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    deleteButton: {
        backgroundColor: '#DC3545',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 8,
        backgroundColor: '#007BFF',
        borderRadius: 4,
    },
    tableHeaderCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CED4DA',
        backgroundColor: '#FFFFFF',
    },
    tableData: {
        flex: 1,
        textAlign: 'center',
        color: '#495057',
    },
});

export default Home;
