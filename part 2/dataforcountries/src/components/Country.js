import Weather from "./Weather"
const Country = ({data}) => {
    const name = data.name.common;
    const capital = data.capital[0];
    const languages = data.languages;
    const flag = data.flags.png;
    const area = data.area;
 
    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <p><strong>languages: </strong></p>
            <ul>
                {Object.values(languages).map(language => {
                    return <li key={language}>{language}</li>
                })}
            </ul>
            <img src={flag} alt={name} />
            <Weather city={capital} />
        </div>
    )
}

export default Country