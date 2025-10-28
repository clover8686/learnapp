import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';

export default function LessonDetail() {
  const { courseId, lessonId } = useParams<{courseId:string, lessonId:string}>();
  const [lesson, setLesson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { isCompleted, markCompleted } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseId || !lessonId) { setLoading(false); return; }
    const parts = lessonId.split('-');
    const order = parts[1] ? Number(parts[1]) : 1;
    setLesson({
      id: lessonId,
      order,
      title: `Lesson ${order}`,
      duration: 10 + order * 2,
      description: `Mô tả chi tiết cho lesson ${order}.`,
    });
    setLoading(false);
  }, [courseId, lessonId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!lesson) return <div className="p-4">Không tìm thấy bài học</div>;

  const completed = isCompleted(courseId!, lesson.id);

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto mt-14">
      <button className="mb-4 text-blue-600" onClick={()=>navigate(-1)}>Back</button>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">Bài {lesson.order}: {lesson.title}</h2>
        <div className="text-sm text-gray-500 mt-1">{lesson.duration} phút</div>
        <p className="mt-3 text-gray-700">{lesson.description}</p>

        <div className="mt-4 flex gap-2">
          <button onClick={()=>{ markCompleted(courseId!, lesson.id); }} className={`px-4 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
            {completed ? 'Đã hoàn thành' : 'Mark as Completed'}
          </button>
          <Link to={`/courses/${courseId}`} className="px-4 py-2 rounded border">Back to Course</Link>
        </div>
      </div>
    </div>
  );
}
