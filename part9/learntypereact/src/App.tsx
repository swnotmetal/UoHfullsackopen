



const App = () => { 
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  
  }
  
  interface CourseDes extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CourseDes {
  
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CourseDes {
  
    backgroundMaterial: string;
    kind: "background"
  }
  interface CoursePartReq extends CourseDes {
    requirements: string[];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartReq;
  const courseParts : CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const Header = ({name}: {name: string}): JSX.Element=> {
    return <h1>{name}</h1>

  }
  interface ContentType {
    name: string,
    exerciseCount: number;
  }

  /*const Content = ({ content }: { content: ContentType[] }): JSX.Element => {
    return (
      <div>
       {content.map( content => <p key={content.name}>{content.name} {content.exerciseCount}</p>)}
      </div>
    )
  }*/

  const Part =( {part} : {part: CoursePart}) => { 
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
            <p>submit to  {part.backgroundMaterial}</p>
          </div>
        );
      case "group":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>group projects {part.groupProjectCount}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
            <p>requirements: {part.requirements.join (" ,")}</p>
          </div>
        )
    
    }
  }
  const Content =({p} : {p : CoursePart []}) => {
    return (
      <div>
        {p.map(part => {
          return (
            <div key={part.name}>
              <Part part={part}/>
            </div>
          )
        })}
      </div>
    )

  }

  const Total = ({ content }: { content: ContentType[] }): JSX.Element => {
    return (
      <div>
        <br />
        The total amount is:
        {content.reduce((sum, part) => sum + part.exerciseCount, 0)}
      </div>
    )
  }



  return (
    <div>
      <Header name={courseName} />
      <Content p={courseParts}/>
      <Total content = {courseParts} />
    </div>
  );
};

export default App;