const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ title }) => {
    if (title === "Web Development Curriculum") {
        return <h1>{title}</h1>
    } else {
        return <h2>{title}</h2>
    }
}

const Content = ({ parts }) => {
    return (parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />));
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => {
    let total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <strong>total of {total} exercises</strong>
    );
}

export default Course;