

const App = () => { 
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const Header = ({name}: {name: string}): JSX.Element=> {
    return <h1>{name}</h1>

  }
  interface ContentType {
    name: string,
    exerciseCount: number;
  }

  const Content = ({ content }: { content: ContentType[] }): JSX.Element => {
    return (
      <div>
       {content.map( content => <p key={content.name}>{content.name} {content.exerciseCount}</p>)}
      </div>
    )
  }

  const Total = ({ content }: { content: ContentType[] }): JSX.Element => {
    return (
      <div>
        The total amount is:
        {content.reduce((sum, part) => sum + part.exerciseCount, 0)}
      </div>
    )
  }



  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts}/>
      <Total content = {courseParts} />
    </div>
  );
};

export default App;