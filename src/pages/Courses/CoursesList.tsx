import { useCourses } from '../../hooks/useCourses';
import CourseCard from '../../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useTheme } from '../../context/ThemeContext';
import { Search } from 'lucide-react';

export default function CoursesList() {
  const { courses, loading, error, page, total, setPage, search, setSearch, filterLevel, setFilterLevel } = useCourses(1, 9);
  const navigate = useNavigate();
  const totalPages = Math.ceil(total / 9) || 1;
//   const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="max-w-5xl mx-auto mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex gap-2 mt-14">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                value={search} 
                onChange={e=>setSearch(e.target.value)} 
                placeholder="Search courses..." 
                className="pl-10 w-full px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
              />
            </div>
            <select 
              value={filterLevel} 
              onChange={(e)=>setFilterLevel(e.target.value)} 
              className="px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
              <option value="All">All</option>
              <option value="S">S</option>
              <option value="Pres">Pres</option>
              <option value="TC">TC</option>
              <option value="MTC">MTC</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : courses.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-gray-500 dark:text-gray-400 text-center py-8"
          >
            No results found
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {courses.map((c, index) => (
              <motion.div 
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/courses/${c.id}`)}
                className="cursor-pointer transform transition-transform"
              >
                <CourseCard course={c} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-6 flex justify-center items-center gap-3">
          <button 
            disabled={page===1} 
            onClick={()=>setPage(page-1)} 
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            Prev
          </button>
          <span className="dark:text-white">Page {page} / {totalPages}</span>
          <button 
            disabled={page>=totalPages} 
            onClick={()=>setPage(page+1)} 
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
