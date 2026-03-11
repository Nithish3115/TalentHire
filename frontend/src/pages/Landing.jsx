import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen selection:bg-primary-200 selection:text-primary-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white/50 pt-16">
                {/* Background decorative elements */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-300 to-emerald-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center lg:pt-32">
                    <span className="inline-flex items-center rounded-full border border-primary-100 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 shadow-sm">
                        Campus Hiring Platform
                    </span>
                    <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
                        Find your next <span className="relative whitespace-nowrap text-primary-600">
                            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-emerald-600">dream job</span>
                        </span> today.
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-600 sm:text-xl">
                        The smartest way to discover opportunities and hire the best graduates. Connect directly with top recruiters and launch your career.
                    </p>
                    <div className="mt-10 flex justify-center gap-x-6">
                        <Link to="/register" className="btn-primary py-3.5 px-8 text-lg font-semibold shadow-primary-500/30">
                            Get started free
                        </Link>
                        <Link to="/login" className="btn-secondary py-3.5 px-8 text-lg flex items-center gap-2 group">
                            Log in
                            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-cyan-300 to-emerald-300 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-24 sm:py-32 bg-white/70 scroll-mt-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600 tracking-wide uppercase">Everything you need</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">A better way to hire and get hired</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-2">
                            {/* Feature 1 */}
                            <div className="flex flex-col surface-card p-8 hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 bg-primary-100/50 w-40 h-40 rounded-full blur-3xl group-hover:bg-primary-200/50 transition-colors"></div>
                                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-900 z-10">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-emerald-500 shadow-sm">
                                        <FaGraduationCap className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    For Students
                                </dt>
                                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-slate-600 z-10">
                                    <p className="flex-auto">Browse hundreds of job postings from top companies. Filter by role, apply with one click, and track your application status in real-time. Stand out to recruiters with a rich profile.</p>
                                    <p className="mt-8">
                                        <Link to="/register" className="text-sm font-semibold leading-6 text-primary-600 hover:text-primary-500 group-hover:underline">
                                            Create your profile <span aria-hidden="true">→</span>
                                        </Link>
                                    </p>
                                </dd>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col surface-card p-8 hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group">
                                <div className="absolute -left-10 -bottom-10 bg-emerald-100/50 w-40 h-40 rounded-full blur-3xl group-hover:bg-emerald-200/50 transition-colors"></div>
                                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-900 z-10">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-primary-600 shadow-sm">
                                        <FaBriefcase className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    For Recruiters
                                </dt>
                                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-slate-600 z-10">
                                    <p className="flex-auto">Post job openings, review student applications, and seamlessly manage your hiring pipeline. View applicant profiles with detailed skillsets and backgrounds to make the best hire.</p>
                                    <p className="mt-8">
                                        <Link to="/register" className="text-sm font-semibold leading-6 text-emerald-600 hover:text-emerald-500 group-hover:underline">
                                            Start hiring today <span aria-hidden="true">→</span>
                                        </Link>
                                    </p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto surface-card p-8 sm:p-12 text-center">
                    <h3 className="section-title">Ready to move from searching to hiring?</h3>
                    <p className="mt-3 text-slate-600 text-base sm:text-lg">
                        Join as a student or recruiter and start building meaningful career outcomes now.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="btn-primary w-full sm:w-auto">
                            Create Account
                        </Link>
                        <Link to="/login" className="btn-secondary w-full sm:w-auto">
                            I already have an account
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;
