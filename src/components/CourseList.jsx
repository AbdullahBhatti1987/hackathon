import CourseCard from "./CourseCard";
import CourseArray from "@/content/CourseArray";

export default function CourseList({ OnClick }) {
  return (
   
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}

        >
          {CourseArray.map((course, id) => (
            <CourseCard key={id} onClick={OnClick} imageUrl={course.imageUrl} />
          ))}
        </div>
   
  );
}
