import api from './api';

export const getStudentById = async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
};
