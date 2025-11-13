import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfileSetupPage from './pages/ProfileSetupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import RemediesPage from './pages/RemediesPage.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';
import FoodRecommendationsPage from './pages/FoodRecommendationsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="remedies" element={<RemediesPage />} />
      <Route path="chatbot" element={<ChatbotPage />} />
      <Route path="recommendations" element={<FoodRecommendationsPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="profile-setup" element={<ProfileSetupPage />} />
      </Route>
      <Route element={<ProtectedRoute requireProfile />}>
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;

