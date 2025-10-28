import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Course, Lesson } from "../../types";
import { useProgress } from "../../hooks/useProgress";


export default function CourseDetail() {
  const { id } = useParams<{id:string}>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { progressMap, toggleCompleted } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(r=>r.json())
      .then((p:any) => {
        const lessons: Lesson[] = Array.from({length: Math.max(5, p.id % 10 + 3)}).map((_, i)=>({
          id: `${p.id}-${i+1}`,
          courseId: String(p.id),
          title: `Lesson ${i+1}: ${p.title} part ${i+1}`,
          duration: 5 + ((i+1)*3),
          description: p.description,
          order: i+1,
          status: 'not-started'
        }));
        setCourse({
          id: String(p.id),
          title: p.title,
          description: p.description,
          thumbnail: p.thumbnail || p.images?.[0],
          cover: p.images?.[0],
          level: (['S','Pres','TC','MTC'] as any)[p.id % 4],
          kindOfCourse: (['IELTS','TOEIC','4SKILLS','VSTEP'] as any)[p.id % 4],
          totalLessons: lessons.length,
          lessons
        });
      })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!course) return <div className="p-4">Course not found</div>;

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <div className="rounded-lg overflow-hidden">
        {course.cover && <img src={course.cover} alt={course.title} className="w-full h-48 object-cover" />}
        <div className="p-4 bg-white">
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <p className="text-sm text-gray-600 mt-2">{course.description}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Lessons</h3>
            <ul className="mt-2 space-y-2">
              {course.lessons?.map(lesson => {
                const key = `${course.id}-${lesson.id}`;
                const finished = !!progressMap[key];
                return (
                  <li key={lesson.id} className="p-3 bg-gray-50 rounded flex items-center justify-between">
                    <div>
                      <div className="font-medium">{lesson.order}. {lesson.title}</div>
                      <div className="text-sm text-gray-500">{lesson.duration} min • {finished ? 'Completed' : 'Not started'}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>navigate(`/courses/${course.id}/lessons/${lesson.id}`)} className="px-3 py-1 rounded border">Open</button>
                      <button onClick={()=>toggleCompleted(course.id, lesson.id)} className={`px-3 py-1 rounded ${finished ? 'bg-green-600 text-white' : 'bg-white border'}`}>{finished ? 'Completed' : 'Mark'}</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4">
            <Link to="/" className="text-sm text-blue-600">Back to courses</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
