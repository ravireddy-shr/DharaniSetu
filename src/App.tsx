import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { useAppStore } from './store/appStore';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ToastContainer } from './components/ui/Toast';
import { LoginPage } from './pages/public/LoginPage';
import { HomePage } from './pages/public/HomePage';
import { RouteProgressBar } from './components/layout/RouteProgressBar';
import { PageTransition } from './components/layout/PageTransition';
import { RouteLoadingFallback } from './components/common/RouteLoadingFallback';
import './i18n';

// Public pages
const ContactPage = lazy(() => import('./pages/public/ContactPage').then(m => ({ default: m.ContactPage })));

// Citizen pages
const CitizenDashboard = lazy(() => import('./pages/citizen/CitizenDashboard').then(m => ({ default: m.CitizenDashboard })));
const MyLandPage = lazy(() => import('./pages/citizen/MyLandPage').then(m => ({ default: m.MyLandPage })));
const GISPage = lazy(() => import('./pages/citizen/GISPage').then(m => ({ default: m.GISPage })));
const ServicesPage = lazy(() => import('./pages/citizen/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ApplicationFormPage = lazy(() => import('./pages/citizen/ApplicationFormPage').then(m => ({ default: m.ApplicationFormPage })));
const ApplicationsPage = lazy(() => import('./pages/citizen/ApplicationsPage').then(m => ({ default: m.ApplicationsPage })));
const ApplicationDetailPage = lazy(() => import('./pages/citizen/ApplicationDetailPage').then(m => ({ default: m.ApplicationDetailPage })));
const TrackApplicationPage = lazy(() => import('./pages/citizen/TrackApplicationPage').then(m => ({ default: m.TrackApplicationPage })));
const NotificationsPage = lazy(() => import('./pages/citizen/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const DocumentsPage = lazy(() => import('./pages/citizen/DocumentsPage').then(m => ({ default: m.DocumentsPage })));
const CitizenProfilePage = lazy(() => import('./pages/citizen/CitizenProfilePage').then(m => ({ default: m.CitizenProfilePage })));

// Dedicated Citizen Service Applications
const RegistrationApplicationPage = lazy(() => import('./pages/citizen/services/RegistrationApplicationPage').then(m => ({ default: m.RegistrationApplicationPage })));
const MutationApplicationPage = lazy(() => import('./pages/citizen/services/MutationApplicationPage').then(m => ({ default: m.MutationApplicationPage })));
const ConversionApplicationPage = lazy(() => import('./pages/citizen/services/ConversionApplicationPage').then(m => ({ default: m.ConversionApplicationPage })));
const BuildingApplicationPage = lazy(() => import('./pages/citizen/services/BuildingApplicationPage').then(m => ({ default: m.BuildingApplicationPage })));
const SurveyApplicationPage = lazy(() => import('./pages/citizen/services/SurveyApplicationPage').then(m => ({ default: m.SurveyApplicationPage })));
const GrievanceApplicationPage = lazy(() => import('./pages/citizen/services/GrievanceApplicationPage').then(m => ({ default: m.GrievanceApplicationPage })));
const CorrectionApplicationPage = lazy(() => import('./pages/citizen/services/CorrectionApplicationPage').then(m => ({ default: m.CorrectionApplicationPage })));
const CertificatesApplicationPage = lazy(() => import('./pages/citizen/services/CertificatesApplicationPage').then(m => ({ default: m.CertificatesApplicationPage })));

// Officer pages
const OfficerDashboard = lazy(() => import('./pages/officer/OfficerDashboard').then(m => ({ default: m.OfficerDashboard })));
const OfficerApplicationsPage = lazy(() => import('./pages/officer/OfficerApplicationsPage').then(m => ({ default: m.OfficerApplicationsPage })));
const OfficerApplicationDetailPage = lazy(() => import('./pages/officer/OfficerApplicationDetailPage').then(m => ({ default: m.OfficerApplicationDetailPage })));
const OfficerGISPage = lazy(() => import('./pages/officer/OfficerGISPage').then(m => ({ default: m.OfficerGISPage })));
const OfficerNotificationsPage = lazy(() => import('./pages/officer/OfficerNotificationsPage').then(m => ({ default: m.OfficerNotificationsPage })));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })));
const OfficerManagementPage = lazy(() => import('./pages/admin/OfficerManagementPage').then(m => ({ default: m.OfficerManagementPage })));
const JurisdictionManagementPage = lazy(() => import('./pages/admin/JurisdictionManagementPage').then(m => ({ default: m.JurisdictionManagementPage })));
const ServiceManagementPage = lazy(() => import('./pages/admin/ServiceManagementPage').then(m => ({ default: m.ServiceManagementPage })));
const AdminApplicationsPage = lazy(() => import('./pages/admin/AdminApplicationsPage').then(m => ({ default: m.AdminApplicationsPage })));
const AuditLogsPage = lazy(() => import('./pages/admin/AuditLogsPage').then(m => ({ default: m.AuditLogsPage })));

// Shared pages
const InteroperabilityPage = lazy(() => import('./pages/shared/InteroperabilityPage').then(m => ({ default: m.InteroperabilityPage })));

export function App() {
  const { isAuthenticated, user } = useAuthStore();
  const syncWithSupabase = useAppStore(state => state.syncWithSupabase);

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  return (
    <Router>
      {/* Sleek top loading progress bar on route changes */}
      <RouteProgressBar />

      <Suspense fallback={<RouteLoadingFallback />}>
        <PageTransition>
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={
              isAuthenticated && user
                ? <Navigate to={
                    user.role === 'citizen' ? '/citizen/dashboard'
                    : user.role === 'officer' ? '/officer/dashboard'
                    : '/admin/dashboard'
                  } replace />
                : <LoginPage />
            } />

            {/* Citizen Routes */}
            <Route path="/citizen/dashboard" element={<ProtectedRoute requiredRole="citizen"><CitizenDashboard /></ProtectedRoute>} />
            <Route path="/citizen/my-land" element={<ProtectedRoute requiredRole="citizen"><MyLandPage /></ProtectedRoute>} />
            <Route path="/citizen/gis" element={<ProtectedRoute requiredRole="citizen"><GISPage /></ProtectedRoute>} />
            <Route path="/citizen/services" element={<ProtectedRoute requiredRole="citizen"><ServicesPage /></ProtectedRoute>} />
            <Route path="/citizen/apply" element={<ProtectedRoute requiredRole="citizen"><ApplicationFormPage /></ProtectedRoute>} />

            {/* Dedicated Individual Service Routes */}
            <Route path="/citizen/apply/registration" element={<ProtectedRoute requiredRole="citizen"><RegistrationApplicationPage /></ProtectedRoute>} />
            <Route path="/citizen/apply/mutation" element={<ProtectedRoute requiredRole="citizen"><MutationApplicationPage /></ProtectedRoute>} />
            <Route path="/citizen/apply/conversion" element={<ProtectedRoute requiredRole="citizen"><ConversionApplicationPage /></ProtectedRoute>} />
            <Route path="/citizen/apply/building" element={<ProtectedRoute requiredRole="citizen"><BuildingApplicationPage /></ProtectedRoute>} />
            <Route path="/citizen/apply/survey" element={<ProtectedRoute requiredRole="citizen"><SurveyApplicationPage /></ProtectedRoute>} />
            <Route path="/citizen/apply/grievance" element={<ProtectedRoute requiredRole="citizen"><GrievanceApplicationPage /></ProtectedRoute>} />
            <Route path="/citizen/apply/correction" element={<ProtectedRoute requiredRole="citizen"><CorrectionApplicationPage /></ProtectedRoute>} />
            <Route path="/citizen/apply/certificates" element={<ProtectedRoute requiredRole="citizen"><CertificatesApplicationPage /></ProtectedRoute>} />

            <Route path="/citizen/applications" element={<ProtectedRoute requiredRole="citizen"><ApplicationsPage /></ProtectedRoute>} />
            <Route path="/citizen/applications/:id" element={<ProtectedRoute requiredRole="citizen"><ApplicationDetailPage /></ProtectedRoute>} />
            <Route path="/citizen/track" element={<ProtectedRoute requiredRole="citizen"><TrackApplicationPage /></ProtectedRoute>} />
            <Route path="/citizen/notifications" element={<ProtectedRoute requiredRole="citizen"><NotificationsPage /></ProtectedRoute>} />
            <Route path="/citizen/documents" element={<ProtectedRoute requiredRole="citizen"><DocumentsPage /></ProtectedRoute>} />
            <Route path="/citizen/profile" element={<ProtectedRoute requiredRole="citizen"><CitizenProfilePage /></ProtectedRoute>} />

            {/* Officer Routes */}
            <Route path="/officer/dashboard" element={<ProtectedRoute requiredRole="officer"><OfficerDashboard /></ProtectedRoute>} />
            <Route path="/officer/applications" element={<ProtectedRoute requiredRole="officer"><OfficerApplicationsPage /></ProtectedRoute>} />
            <Route path="/officer/applications/:id" element={<ProtectedRoute requiredRole="officer"><OfficerApplicationDetailPage /></ProtectedRoute>} />
            <Route path="/officer/pending" element={<ProtectedRoute requiredRole="officer"><OfficerApplicationsPage /></ProtectedRoute>} />
            <Route path="/officer/approvals" element={<ProtectedRoute requiredRole="officer"><OfficerApplicationsPage /></ProtectedRoute>} />
            <Route path="/officer/completed" element={<ProtectedRoute requiredRole="officer"><OfficerApplicationsPage /></ProtectedRoute>} />
            <Route path="/officer/gis" element={<ProtectedRoute requiredRole="officer"><OfficerGISPage /></ProtectedRoute>} />
            <Route path="/officer/interoperability" element={<ProtectedRoute requiredRole="officer"><InteroperabilityPage /></ProtectedRoute>} />
            <Route path="/officer/notifications" element={<ProtectedRoute requiredRole="officer"><OfficerNotificationsPage /></ProtectedRoute>} />
            <Route path="/officer/profile" element={<ProtectedRoute requiredRole="officer"><CitizenProfilePage /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsersPage /></ProtectedRoute>} />
            <Route path="/admin/officers" element={<ProtectedRoute requiredRole="admin"><OfficerManagementPage /></ProtectedRoute>} />
            <Route path="/admin/jurisdictions" element={<ProtectedRoute requiredRole="admin"><JurisdictionManagementPage /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute requiredRole="admin"><ServiceManagementPage /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute requiredRole="admin"><AdminApplicationsPage /></ProtectedRoute>} />
            <Route path="/admin/audit" element={<ProtectedRoute requiredRole="admin"><AuditLogsPage /></ProtectedRoute>} />
            <Route path="/admin/gis" element={<ProtectedRoute requiredRole="admin"><OfficerGISPage /></ProtectedRoute>} />
            <Route path="/admin/interoperability" element={<ProtectedRoute requiredRole="admin"><InteroperabilityPage /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <ToastContainer />
    </Router>
  );
}

export default App;
