export const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

export const Course = ({course}) =>
  <>
    <h2>{course.name}</h2>
    {course.parts.map((x) => <Part key={x.id} part={x} />)}
    <p>
      <b>total of {course.parts.reduce((x, y) => x + y.exercises, 0)} exercises</b>
    </p>
  </>
