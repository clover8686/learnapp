import { useState, useEffect } from 'react';

type ProgressMap = Record<string, boolean>; 

export function useProgress() {
  const [progressMap, setProgressMap] = useState<ProgressMap>(() => {
    try {
      const raw = localStorage.getItem('app_progress');
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('app_progress', JSON.stringify(progressMap));
  }, [progressMap]);

  const toggleCompleted = (courseId: string, lessonId: string) => {
    const key = `${courseId}-${lessonId}`;
    setProgressMap(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const markCompleted = (courseId: string, lessonId: string) => {
    const key = `${courseId}-${lessonId}`;
    setProgressMap(prev => ({ ...prev, [key]: true }));
  };

  const isCompleted = (courseId: string, lessonId: string) => !!progressMap[`${courseId}-${lessonId}`];

  return { progressMap, toggleCompleted, markCompleted, isCompleted };
}
