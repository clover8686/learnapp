import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Course, Lesson, Level } from "../types";

async function fetchCourses(): Promise<Course[]> {
  const response = await fetch('https://dummyjson.com/products?limit=100');
  if (!response.ok) throw new Error('Failed to fetch courses');
  const data = await response.json();
  
  return (data.products || []).map((p: any): Course => ({
    id: String(p.id),
    title: p.title,
    description: p.description,
    thumbnail: p.thumbnail || p.images?.[0] || '',
    cover: p.images?.[0] || '',
    level: (['S','Pres','TC','MTC'] as any)[p.id % 4] as Level,
    kindOfCourse: (['IELTS','TOEIC','4SKILLS','VSTEP'] as any)[p.id % 4],
    totalLessons: Math.max(5, (p.id % 12) + 3),
    lessons: Array.from({length: Math.max(5, p.id % 10 + 3)}).map((_, i) => ({
      id: `${p.id}-${i+1}`,
      courseId: String(p.id),
      title: `Lesson ${i+1}: ${p.title} part ${i+1}`,
      duration: 5 + ((i+1)*3),
      description: p.description,
      order: i+1,
      status: 'not-started'
    }))
  }));
}

interface CourseContextValue {
    courses: Course[];
    filtered: Course[];
    search: string;
    setSearch: (s: string) => void;
    filterLevel: "All" | Level;
    setFilterLevel: (l: "All" | Level) => void;
    toggleLessonStatus: (lessonId: string) => void;
    getLessonStatus: (lessonId: string) => Lesson["status"];
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

export const useCourses = () => {
    const ctx = useContext(CourseContext);
    if (!ctx)  throw new Error("useCourses must be used within CourseProvider");
    return ctx;
}

const LS_PROGRESS = "rca_progress";
export function CourseProvider({children}: {children: React.ReactNode}) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [search, setSearch] = useState("");
    const [filterLevel, setFilterLevel] = useState<"All" | Level>("All");
    const [progress, setProgress] = useState<Record<string, Lesson["status"]>>(() => JSON.parse(localStorage.getItem(LS_PROGRESS) || "{}"));

    useEffect(() => {
        fetchCourses().then(setCourses);
    }, []);

    useEffect(() => {
        localStorage.setItem(LS_PROGRESS, JSON.stringify(progress));
    }, [progress]);

    const toggleLessonStatus = (lessonId: string) => {
        setProgress((prev) => ({
            ...prev,
            [lessonId]: prev[lessonId] === "completed" ? "not-started" : "completed",
        }));
    };

    const getLessonStatus = (lessonId: string) => progress[lessonId] || "not-started";

    const filtered = useMemo(() => {
        const s = search.toLowerCase();
        return courses.filter((c) => {
            if(filterLevel !== "All" && c.level !== filterLevel) return false;
            return !s || c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s);
        })
    }, [courses, search, filterLevel]);

    return (
        <CourseContext.Provider value={{courses, filtered, search, setSearch, filterLevel, setFilterLevel, toggleLessonStatus, getLessonStatus}}>
            {children}
        </CourseContext.Provider>
    )

}