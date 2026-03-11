import api from './api';

export const applyToJob = async (jobId) => {
    const response = await api.post('/applications', { jobId });
    return response.data;
};

export const getMyApplications = async () => {
    const response = await api.get('/applications/student');
    return response.data;
};

export const getJobApplicants = async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
};

export const updateApplicationStatus = async (id, status) => {
    const response = await api.put(`/applications/${id}/status`, { status });
    return response.data;
};
