const Country = ({ name, capital, area, languages, flag }) => {
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
        </div>
    )
}

export default Country