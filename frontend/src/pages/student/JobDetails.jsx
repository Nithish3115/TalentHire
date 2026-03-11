import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../../services/jobService';
import { applyToJob } from '../../services/applicationService';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getJobById(id);
                setJob(data);
            } catch (err) {
                setError('Failed to load job details. It may have been removed.');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        setApplying(true);
        setMessage('');
        setError('');
        try {
            await applyToJob(id);
            setMessage('Application submitted successfully!');
        } catch (err) {
            setError(err.response?.data || 'Failed to apply. You may have already applied for this job.');
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error && !job) return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
            <button onClick={() => navigate(-1)} className="mt-4 text-primary-600 font-medium">← Go Back</button>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => navigate('/student/jobs')}
                className="flex items-center text-gray-500 hover:text-primary-600 mb-6 transition-colors"
            >
                <FaArrowLeft className="mr-2" /> Back to Jobs
            </button>

            {message && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded text-green-700">
                    {message}
                </div>
            )}

            {error && job && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
                    {error}
                </div>
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-8 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                            <p className="text-lg text-gray-600 mt-2 font-medium">Company / Recruiter ID: {job.recruiterId}</p>
                        </div>
                        <button
                            onClick={handleApply}
                            disabled={applying || message !== ''}
                            className={`px-8 py-3 rounded-md text-white font-semibold text-lg shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                ${applying ? 'bg-primary-400 cursor-not-allowed' : message ? 'bg-green-600 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}
              `}
                        >
                            {applying ? 'Applying...' : message ? 'Applied ✓' : 'Apply Now'}
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-6">
                        <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                            {job.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaMoneyBillWave className="mr-2 text-gray-400" />
                            {job.salary}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaClock className="mr-2 text-gray-400" />
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <div className="px-6 py-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                    <div className="prose max-w-none text-gray-700">
                        <p className="whitespace-pre-line leading-relaxed">{job.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
