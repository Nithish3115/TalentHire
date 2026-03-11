import { FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobCard = ({ job, userRole }) => {
    return (
        <div className="glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden border border-white/50">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-100/40 rounded-full blur-2xl group-hover:bg-primary-200/50 transition-colors"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary-700 transition-colors">{job.title}</h3>
                    <p className="text-sm text-slate-500 font-semibold">{job.recruiterId ? 'Tech Corp' : 'Company'}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-primary-100 to-indigo-100 text-primary-800 shadow-sm border border-primary-200">
                    New
                </span>
            </div>

            <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed relative z-10">
                {job.description}
            </p>

            <div className="flex flex-col space-y-3 mb-8 relative z-10">
                <div className="flex items-center text-sm font-medium text-slate-500">
                    <FaMapMarkerAlt className="mr-3 text-primary-400 text-lg" />
                    {job.location}
                </div>
                <div className="flex items-center text-sm font-medium text-slate-500">
                    <FaMoneyBillWave className="mr-3 text-emerald-400 text-lg" />
                    {job.salary}
                </div>
                <div className="flex items-center text-sm font-medium text-slate-500">
                    <FaClock className="mr-3 text-indigo-400 text-lg" />
                    {new Date(job.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="flex space-x-3 w-full relative z-10 mt-auto">
                {userRole === 'ROLE_STUDENT' && (
                    <Link
                        to={`/student/jobs/${job.id}`}
                        className="w-full btn-primary py-2.5 shadow-primary-500/20 text-sm"
                    >
                        View Details
                    </Link>
                )}
                {userRole === 'ROLE_RECRUITER' && (
                    <Link
                        to={`/recruiter/jobs/${job.id}/applicants`}
                        className="w-full flex justify-center items-center px-4 py-2.5 border-2 border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        View Applicants
                    </Link>
                )}
            </div>
        </div>
    );
};

export default JobCard;
