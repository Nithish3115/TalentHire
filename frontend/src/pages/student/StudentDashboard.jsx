import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getMyApplications } from '../../services/applicationService';
import { getAllJobs } from '../../services/jobService';
import LoadingSpinner from '../../components/LoadingSpinner';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ applications: 0, availableJobs: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [appsRes, jobsRes] = await Promise.all([
                    getMyApplications(),
                    getAllJobs()
                ]);

                setStats({
                    applications: appsRes.length,
                    availableJobs: jobsRes.length
                });
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)]">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{user?.name}</span>!
                </h1>
                <p className="mt-2 text-lg text-slate-600">Here is what is happening with your job search today.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                {/* Stat Card 1 */}
                <div className="glass overflow-hidden rounded-2xl p-6 relative group hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute -right-6 -top-6 bg-primary-100/50 w-24 h-24 rounded-full blur-2xl group-hover:bg-primary-200/50 transition-colors"></div>
                    <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Applications</dt>
                    <dd className="text-5xl font-black text-slate-800">{stats.applications}</dd>
                </div>

                {/* Stat Card 2 */}
                <div className="glass overflow-hidden rounded-2xl p-6 relative group hover:-translate-y-1 transition-all duration-300">
                    <div className="absolute -right-6 -top-6 bg-emerald-100/50 w-24 h-24 rounded-full blur-2xl group-hover:bg-emerald-200/50 transition-colors"></div>
                    <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Available Jobs</dt>
                    <dd className="text-5xl font-black text-emerald-600">{stats.availableJobs}</dd>
                </div>
            </div>

            <div className="glass rounded-3xl p-8 border border-white/40 shadow-xl shadow-slate-200/50">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/student/jobs"
                        className="btn-primary shadow-primary-500/30 flex-1 sm:flex-none"
                    >
                        Browse New Jobs
                    </Link>
                    <Link
                        to="/student/applications"
                        className="flex justify-center items-center px-6 py-3 border-2 border-slate-200 rounded-xl shadow-sm text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5 flex-1 sm:flex-none"
                    >
                        View My Applications
                    </Link>
                    <Link
                        to="/student/profile"
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 hover:-translate-y-0.5 flex-1 sm:flex-none"
                    >
                        Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
