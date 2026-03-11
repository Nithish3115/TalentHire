import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className="glass w-full z-50 sticky top-0 transition-all duration-300 border-b border-white/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-8">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-emerald-600 tracking-tight">
                                JobFair<span className="text-slate-900">Portal</span>
                            </Link>
                        </div>

                        {user && (
                            <div className="hidden md:flex items-center gap-2">
                                {user.role === 'ROLE_STUDENT' ? (
                                    <>
                                        <Link to="/student/dashboard" className="text-slate-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">Dashboard</Link>
                                        <Link to="/student/jobs" className="text-slate-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">Browse Jobs</Link>
                                        <Link to="/student/applications" className="text-slate-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">My Applications</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/recruiter/dashboard" className="text-slate-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">Dashboard</Link>
                                        <Link to="/recruiter/post-job" className="text-slate-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">Post Job</Link>
                                        <Link to="/recruiter/my-jobs" className="text-slate-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">Manage Jobs</Link>
                                    </>
                                )}
                            </div>
                        )}

                    </div>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4 border-l border-slate-200 pl-4 ml-4">
                                <Link to={user.role === 'ROLE_STUDENT' ? '/student/profile' : '/recruiter/profile'} className="text-sm font-semibold text-slate-700 hover:text-primary-600 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-emerald-500 text-white flex items-center justify-center font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="hidden sm:inline-block">{user.name}</span>
                                </Link>
                                <button onClick={handleLogout} className="text-slate-500 hover:text-red-500 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-all">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-slate-600 hover:text-primary-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
                                    Log in
                                </Link>
                                <Link to="/register" className="btn-primary py-2 px-5 shadow-primary-500/30">
                                    Sign up free
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
