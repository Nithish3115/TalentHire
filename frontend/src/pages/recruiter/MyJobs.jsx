import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getMyRecruiterJobs, deleteJob } from '../../services/jobService';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const MyJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchMyJobs = async () => {
        try {
            const myJobs = await getMyRecruiterJobs();
            setJobs(myJobs);
        } catch {
            setError('Failed to fetch your jobs.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyJobs();
    }, [user]);

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await deleteJob(jobId);
                setJobs(jobs.filter(job => job.id !== jobId));
            } catch {
                alert('Failed to delete job. Please try again.');
            }
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Postings</h1>
                    <Link
                        to="/recruiter/post-job"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                    >
                        Post New Job
                    </Link>
                </div>

                {error && (
                    <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {jobs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No active jobs</h3>
                        <p className="text-gray-500 mb-4">You haven&apos;t posted any jobs yet.</p>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {jobs.map((job) => (
                                <li key={job.id} className="hover:bg-gray-50 transition-colors">
                                    <div className="px-4 py-6 sm:px-6 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {job.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1">{job.location} • {job.salary}</p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Posted: {new Date(job.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Link
                                                to={`/recruiter/jobs/${job.id}/applicants`}
                                                className="inline-flex items-center px-3 py-1.5 border border-primary-300 text-xs font-medium rounded text-primary-700 bg-primary-50 hover:bg-primary-100"
                                            >
                                                View Applicants
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(job.id)}
                                                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100"
                                            >
                                                Delete
                                            </button>
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

export default MyJobs;
