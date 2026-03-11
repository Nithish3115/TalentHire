import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../services/jobService';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createJob(formData);
            navigate('/recruiter/my-jobs', { state: { message: 'Job posted successfully!' } });
        } catch (err) {
            setError(err.response?.data || 'Failed to post job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)]">
            <div className="glass shadow-2xl overflow-hidden sm:rounded-3xl border border-white/40">
                <div className="px-6 py-8 sm:px-10 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                    <h3 className="text-2xl leading-6 font-extrabold text-slate-900 tracking-tight">Create New Job Posting</h3>
                    <p className="mt-2 max-w-2xl text-base text-slate-500">Provide details for the opportunity you're looking to fill. Make it stand out!</p>
                </div>

                <div className="px-6 py-8 sm:p-10 bg-white/50">
                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-red-700 shadow-sm flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-1">
                            <label htmlFor="title" className="block text-sm font-semibold text-slate-700">Job Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Senior Software Engineer"
                                className="mt-1 block w-full border-2 border-slate-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors bg-white/80"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <label htmlFor="location" className="block text-sm font-semibold text-slate-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. San Francisco, CA or Remote"
                                    className="mt-1 block w-full border-2 border-slate-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors bg-white/80"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="salary" className="block text-sm font-semibold text-slate-700">Salary Range</label>
                                <input
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="e.g. $90,000 - $120,000"
                                    className="mt-1 block w-full border-2 border-slate-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors bg-white/80"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="description" className="block text-sm font-semibold text-slate-700">Job Description <span className="text-red-500">*</span></label>
                            <textarea
                                id="description"
                                name="description"
                                rows={8}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the role, responsibilities, and qualifications in detail..."
                                className="mt-1 block w-full border-2 border-slate-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors bg-white/80 resize-y"
                            />
                        </div>

                        <div className="pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-auto flex justify-center py-3 px-6 border-2 border-slate-200 rounded-xl shadow-sm text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 focus:outline-none transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full sm:w-auto btn-primary py-3 px-8 shadow-primary-500/30 font-semibold ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
