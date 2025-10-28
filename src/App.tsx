
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import CoursesList from './pages/Courses/CoursesList';
import Login from './pages/Auth/Login';
import CourseDetail from './pages/Courses/CourseDetail';
import LessonDetail from './pages/Courses/LessonDetail';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';

import Header from './components/Header';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <CoursesList />
                </ProtectedRoute>
              } />
              <Route path="/courses/:id" element={
                <ProtectedRoute>
                  <CourseDetail />
                </ProtectedRoute>
              } />
              <Route path="/courses/:courseId/lessons/:lessonId" element={
                <ProtectedRoute>
                  <LessonDetail />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
