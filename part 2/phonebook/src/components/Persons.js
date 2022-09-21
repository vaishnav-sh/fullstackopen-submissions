import React from "react";

const Persons = ({ persons, personDelete }) => {
    return (
        persons.map((person) => {
            return <p key={person.name}>{person.name} {person.number} 
                    <button style={{marginLeft: '5px'}} onClick={personDelete}>delete</button>
            </p>
        })
    );
}

export default Persons