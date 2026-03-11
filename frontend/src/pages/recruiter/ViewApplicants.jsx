import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobApplicants, updateApplicationStatus } from '../../services/applicationService';
import { getJobById } from '../../services/jobService';
import { getStudentById } from '../../services/studentService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ViewApplicants = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [studentsData, setStudentsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobRes = await getJobById(jobId);
                setJob(jobRes);

                const appsRes = await getJobApplicants(jobId);
                setApplicants(appsRes);

                const stdMap = {};
                const uniqueStudentIds = [...new Set(appsRes.map((app) => app.studentId))];
                await Promise.all(
                    uniqueStudentIds.map(async (studentId) => {
                        try {
                            const student = await getStudentById(studentId);
                            stdMap[studentId] = student;
                        } catch {
                            stdMap[studentId] = {
                                name: `Student #${studentId}`,
                                degree: 'N/A',
                                cgpa: 'N/A',
                                skills: 'N/A',
                            };
                        }
                    })
                );
                setStudentsData(stdMap);

            } catch {
                setError('Failed to fetch applicants. Unauthorized or job deleted.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [jobId]);

    const handleStatusUpdate = async (appId, newStatus) => {
        setProcessingId(appId);
        try {
            await updateApplicationStatus(appId, newStatus);
            setApplicants(applicants.map(app =>
                app.id === appId ? { ...app, status: newStatus } : app
            ));
        } catch {
            alert('Failed to update status.');
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ACCEPTED': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Accepted</span>;
            case 'REJECTED': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
            default: return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error) return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="mb-6">
                    <Link to="/recruiter/my-jobs" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-4">
                        <FaArrowLeft className="mr-2" /> Back to My Jobs
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Applicants for: {job?.title}</h1>
                    <p className="mt-2 text-sm text-gray-500">Review and manage candidates who have applied to this position.</p>
                </div>

                {applicants.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <p className="text-gray-500">No applications received yet.</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {applicants.map((app) => (
                                                <tr key={app.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {studentsData[app.studentId]?.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {studentsData[app.studentId]?.degree}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {studentsData[app.studentId]?.cgpa}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs truncate">
                                                        {studentsData[app.studentId]?.skills}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(app.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {app.status === 'PENDING' && (
                                                            <div className="flex justify-end space-x-2">
                                                                <button
                                                                    onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                                                                    disabled={processingId === app.id}
                                                                    className="text-green-600 hover:text-green-900 flex items-center"
                                                                >
                                                                    <FaCheckCircle className="mr-1" /> Accept
                                                                </button>
                                                                <button
                                                                    onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                                                    disabled={processingId === app.id}
                                                                    className="text-red-600 hover:text-red-900 flex items-center"
                                                                >
                                                                    <FaTimesCircle className="mr-1" /> Reject
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewApplicants;
