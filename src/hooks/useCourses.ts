import { useState, useEffect } from 'react';
import type { Course } from '../types';
import { useProgress } from './useProgress';


interface UseCoursesResult {
  courses: Course[];
  loading: boolean;
  error?: string;
  page: number;
  total: number;
  setPage: (n:number) => void;
  search: string;
  setSearch: (s:string) => void;
  filterLevel: string;
  setFilterLevel: (s:string) => void;
}

export function useCourses(initialPage = 1, limit = 9): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|undefined>(undefined);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const { progressMap } = useProgress();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(undefined);

    const skip = (page - 1) * limit;
    fetch(`https://dummyjson.com/products?limit=100`)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        const mapped = (data.products || []).map((p: any): Course => {
          const totalLessons = Math.max(5, (p.id % 12) + 3);
          const completedLessons = Array.from({ length: totalLessons }).filter((_, i) => 
            progressMap[`${p.id}-${p.id}-${i + 1}`]
          ).length;
          
          return {
            id: String(p.id),
            title: p.title,
            description: p.description,
            thumbnail: p.thumbnail || p.images?.[0] || '',
            cover: p.images?.[0] || '',
            level: (['S','Pres','TC','MTC'] as any)[p.id % 4] as any,
            kindOfCourse: (['IELTS','TOEIC','4SKILLS','VSTEP'] as any)[p.id % 4],
            totalLessons,
            progress: (completedLessons / totalLessons) * 100,
          };
        });

        let filtered = mapped;
        if (search) {
          const searchLower = search.toLowerCase();
          filtered = filtered.filter((course: Course) => 
            course.title.toLowerCase().includes(searchLower) ||
            course.description.toLowerCase().includes(searchLower)
          );
        }
        
        if (filterLevel !== 'All') {
          filtered = filtered.filter((course: Course) => course.level === filterLevel);
        }

        const startIndex = skip;
        const endIndex = startIndex + limit;
        const paginatedCourses = filtered.slice(startIndex, endIndex);
        
        setCourses(paginatedCourses);
        setTotal(filtered.length);
      })
      .catch(err => {
        if (!cancelled) setError(String(err));
      })
      .finally(()=> { if (!cancelled) setLoading(false); });

    return ()=>{ cancelled = true; };
  }, [page, search, filterLevel, limit, progressMap]);

  return { courses, loading, error, page, total, setPage, search, setSearch, filterLevel, setFilterLevel };
}
