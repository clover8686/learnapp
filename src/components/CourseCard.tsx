import React from 'react';
import type { Course } from '../types';
import ProgressBar from './ProgressBar';

const CourseCard: React.FC<{course: Course}> = ({ course }) => {
  return (
    <article className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        {course.thumbnail ? <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" /> : <div className="flex items-center justify-center h-full">No Image</div>}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-lg">{course.title}</h3>
        <div className="text-sm text-gray-500">{course.kindOfCourse} • Level {course.level}</div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
        <div className="mt-3">
          <span className="text-sm">{course.totalLessons} lessons</span>
          <ProgressBar value={course.progress ?? 0} />
        </div>
      </div>
    </article>
  );
};
export default CourseCard;
