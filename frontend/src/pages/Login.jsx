import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await loginUser(email, password);
            if (user.role === 'ROLE_STUDENT') {
                navigate('/student/dashboard');
            } else {
                navigate('/recruiter/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="max-w-md w-full space-y-8 glass p-10 sm:p-14 rounded-3xl border border-white/50 shadow-2xl relative z-10 mx-auto">
                <div>
                    <h2 className="mt-2 text-center text-4xl font-extrabold tracking-tight text-slate-900">
                        Welcome back
                    </h2>
                    <p className="mt-3 text-center text-base text-slate-600 font-medium">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 transition-all">
                            Sign up here
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50/90 backdrop-blur-sm p-4 rounded-xl border-l-4 border-red-500 text-red-700 text-sm font-medium shadow-sm flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div className="space-y-1">
                            <label htmlFor="email-address" className="block text-sm font-semibold text-slate-700 ml-1">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none block w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors bg-white/80"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none block w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-0 focus:border-primary-500 transition-colors bg-white/80"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full btn-primary py-3.5 text-lg shadow-primary-500/30 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="mt-8 pt-6 text-center border-t border-slate-200/60">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Test Accounts</p>
                        <div className="flex flex-col space-y-2 text-xs font-medium text-slate-600 bg-white/60 p-4 rounded-xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center px-1">
                                <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded">Student</span>
                                <span className="text-slate-800">student1@university.edu</span>
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Recruiter</span>
                                <span className="text-slate-800">recruiter1@techcorp.com</span>
                            </div>
                            <div className="pt-2 mt-1 border-t border-slate-200 text-center font-mono text-slate-500">
                                Password: password123
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
