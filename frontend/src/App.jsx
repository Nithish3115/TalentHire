import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import BrowseJobs from './pages/student/BrowseJobs';
import JobDetails from './pages/student/JobDetails';
import MyApplications from './pages/student/MyApplications';
import StudentProfile from './pages/student/StudentProfile';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import PostJob from './pages/recruiter/PostJob';
import MyJobs from './pages/recruiter/MyJobs';
import ViewApplicants from './pages/recruiter/ViewApplicants';
import RecruiterProfile from './pages/recruiter/RecruiterProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={
                <PrivateRoute role="ROLE_STUDENT"><StudentDashboard /></PrivateRoute>
              } />
              <Route path="/student/jobs" element={
                <PrivateRoute role="ROLE_STUDENT"><BrowseJobs /></PrivateRoute>
              } />
              <Route path="/student/jobs/:id" element={
                <PrivateRoute role="ROLE_STUDENT"><JobDetails /></PrivateRoute>
              } />
              <Route path="/student/applications" element={
                <PrivateRoute role="ROLE_STUDENT"><MyApplications /></PrivateRoute>
              } />
              <Route path="/student/profile" element={
                <PrivateRoute role="ROLE_STUDENT"><StudentProfile /></PrivateRoute>
              } />

              {/* Recruiter Routes */}
              <Route path="/recruiter/dashboard" element={
                <PrivateRoute role="ROLE_RECRUITER"><RecruiterDashboard /></PrivateRoute>
              } />
              <Route path="/recruiter/post-job" element={
                <PrivateRoute role="ROLE_RECRUITER"><PostJob /></PrivateRoute>
              } />
              <Route path="/recruiter/my-jobs" element={
                <PrivateRoute role="ROLE_RECRUITER"><MyJobs /></PrivateRoute>
              } />
              <Route path="/recruiter/jobs/:jobId/applicants" element={
                <PrivateRoute role="ROLE_RECRUITER"><ViewApplicants /></PrivateRoute>
              } />
              <Route path="/recruiter/profile" element={
                <PrivateRoute role="ROLE_RECRUITER"><RecruiterProfile /></PrivateRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
