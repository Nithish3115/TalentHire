const Footer = () => {
    return (
        <footer className="mt-auto border-t border-white/40 bg-white/65 backdrop-blur-md">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-slate-600">
                        &copy; {new Date().getFullYear()} JobFair Portal
                    </p>
                    <p className="text-sm text-slate-500">
                        Connecting top student talent with growth-focused teams.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
