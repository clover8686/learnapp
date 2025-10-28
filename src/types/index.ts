export type Level = 'S' | 'Pres' | 'TC' | 'MTC';
export type KindOfCourse = 'IELTS' | 'TOEIC' | '4SKILLS' | 'VSTEP';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: number; 
  url?: string;
  description?: string;
  status?: 'not-started' | 'in-progress' | 'completed';
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  cover?: string;
  level: Level;
  kindOfCourse: KindOfCourse;
  totalLessons: number;
  progress?: number;
  lessons?: Lesson[];
}
