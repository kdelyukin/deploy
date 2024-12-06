import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ResultPage from './pages/ResultPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicListsPage from './pages/PublicListsPage';
import UserPolicyPage from './pages/UserPolicyPage';
import SecurityPolicyPage from './pages/SecurityPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CopyrightPolicyPage from './pages/CopyrightPolicyPage';
import DMCATakedownPolicyPage from './pages/DMCATakedownPolicyPage';
import AcceptableUsePolicyPage from './pages/AcceptableUsePolicyPage';

import VideoBackground from './components/VideoBackground';

function App() {
  return (
    <BrowserRouter>
      <VideoBackground videoSrc="background.mp4">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
          <Route path="/results" element={<ResultPage />} />
          <Route path="/publiclists" element={<PublicListsPage />} />
          <Route path="/userpolicy" element={<UserPolicyPage />} />
          <Route path="/securitypolicy" element={<SecurityPolicyPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
          <Route path="/copyrightpolicy" element={<CopyrightPolicyPage />} />
          <Route path="/dmcatakedownpolicy" element={<DMCATakedownPolicyPage />} />
          <Route path="/acceptableusepolicy" element={<AcceptableUsePolicyPage />} />
        </Routes>
      </VideoBackground>
    </BrowserRouter>
  )
}

export default App;
