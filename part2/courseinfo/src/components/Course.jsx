import React from "react";

const Header = ({ courseName }) => {
    console.log(courseName);
  return (
    <h2>{courseName}</h2>
  );
};

const InputField = ({ name, exercises }) => {
    console.log(name, exercises);
  return (
    <p>{name} {exercises}</p>
  );
};

const Content = ({ parts }) => {
    console.log(parts);
  return (
    <div>
      {parts.map(part => (
        <InputField
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
    </div>
  );
};
const TotalExcercises = ({exercises}) => {
  console.log(exercises);
  const total = exercises.reduce((acc, part) => acc + part.exercises, 0)
  console.log('Total Exercises:', total);
  return (
    <p>
      <strong>total of {total} of exercises</strong>
    </p>
  )
}

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <TotalExcercises exercises={course.parts}  />
    </div>
  );
};

export default Course;
