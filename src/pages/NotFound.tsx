import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="mt-2">Page not found</p>
        <Link to="/" className="mt-4 inline-block text-blue-600">Back home</Link>
      </div>
    </div>
  );
}
