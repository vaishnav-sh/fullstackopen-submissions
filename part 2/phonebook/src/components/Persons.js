import React from "react";

const Persons = ({ persons, personDelete }) => {
    return (
      <>
        <h3>Numbers</h3>
        {persons.map((person) => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
              <button style={{ marginLeft: "5px" }} onClick={() => personDelete(person.id, person.name)}>
                delete
              </button>
            </p>
          );
        })}
      </>
    );
}

export default Persons