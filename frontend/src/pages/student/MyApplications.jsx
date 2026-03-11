import { useState, useEffect } from 'react';
import { getMyApplications } from '../../services/applicationService';
import { getJobById } from '../../services/jobService';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [jobsData, setJobsData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appsRes = await getMyApplications();
                setApplications(appsRes);

                const jobsMap = {};
                await Promise.all(
                    appsRes.map(async (app) => {
                        if (!jobsMap[app.jobId]) {
                            try {
                                const jobRes = await getJobById(app.jobId);
                                jobsMap[app.jobId] = jobRes;
                            } catch (e) {
                                jobsMap[app.jobId] = { title: 'Unknown Job (Deleted)', location: 'N/A' };
                            }
                        }
                    })
                );
                setJobsData(jobsMap);

            } catch (error) {
                console.error("Error fetching applications", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-200';
            case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

                {applications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                        <Link
                            to="/student/jobs"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {applications.map((app) => (
                                <li key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <div className="px-4 py-6 sm:px-6 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-semibold text-primary-600">
                                                <Link to={`/student/jobs/${app.jobId}`}>{jobsData[app.jobId]?.title || 'Loading...'}</Link>
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1">Location: {jobsData[app.jobId]?.location || 'N/A'}</p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Applied: {new Date(app.appliedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full border shadow-sm uppercase ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
