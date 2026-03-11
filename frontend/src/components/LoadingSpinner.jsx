const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full min-h-[50vh]">
            <div className="relative">
                <div className="h-14 w-14 rounded-full border-4 border-primary-100"></div>
                <div className="animate-spin absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 border-r-emerald-500"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
