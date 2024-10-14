import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Platform } from 'react-native';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../utils/api';

const Home = () => {
    // Aquí mantenemos el estado y la lógica como antes
    const [formData, setFormData] = useState({
        rut: '',
        nombres: '',
        apellido_p: '',
        apellido_m: '',
        direccion: '',
    });
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [action, setAction] = useState('');

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

    const handleShowModal = (actionType, user) => {
        setAction(actionType);
        if (user) {
            setSelectedId(user.id);
            setFormData({
                rut: user.rut,
                nombres: user.nombres,
                apellido_p: user.apellido_p,
                apellido_m: user.apellido_m,
                direccion: user.direccion,
            });
        } else {
            clearForm();
        }
        setModalVisible(true);
    };

    const handleConfirm = () => {
        if (action === 'create') {
            handleCreate();
        } else if (action === 'update') {
            handleUpdate();
        } else if (action === 'delete') {
            handleDelete();
        }
        setModalVisible(false);
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
                <TouchableOpacity style={styles.button} onPress={() => handleShowModal('create')}>
                    <Text style={styles.buttonText}>Nuevo Cliente</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Lista de Clientes</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>ID</Text>
                    <Text style={styles.tableHeaderCell}>Rut</Text>
                    <Text style={styles.tableHeaderCell}>Nombres</Text>
                    <Text style={styles.tableHeaderCell}>Apellido P.</Text>
                </View>

                {users.map(user => (
                    <TouchableOpacity key={user.id} style={styles.dataRow} onPress={() => handleShowModal('update', user)}>
                        <Text style={styles.tableData}>{user.id}</Text>
                        <Text style={styles.tableData}>{user.rut}</Text>
                        <Text style={styles.tableData}>{user.nombres}</Text>
                        <Text style={styles.tableData}>{user.apellido_p}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {Platform.OS !== 'windows' && (
                <CustomModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    formData={formData}
                    setFormData={setFormData}
                    handleConfirm={handleConfirm}
                    handleDelete={handleDelete}
                    action={action}
                />
            )}
        </View>
    );
};

const CustomModal = ({ modalVisible, setModalVisible, formData, setFormData, handleConfirm, handleDelete, action }) => (
    <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
                    <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>
                            {action === 'create' ? 'Crear' : 'Actualizar'}
                        </Text>
                    </TouchableOpacity>
                    {action === 'update' && (
                        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    main: {
        flex: 1,
        padding: 15,
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
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
});

export default Home;
