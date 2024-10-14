import { API_URL } from './constants';

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    return response;
};


export const registerUser = async (username, password, email) => {
    const response = await fetch(`${API_URL}/api/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
    });

    return response;
};

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/clientes/`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (formData) => {
    try {
        await fetch(`${API_URL}/clientes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (id, formData) => {
    try {
        await fetch(`${API_URL}/clientes/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        await fetch(`${API_URL}/clientes/${id}/`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
