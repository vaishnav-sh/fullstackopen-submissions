import React from "react";

const PersonForm = ({ onSubmit, newName, nameChange, newNumber, numChange }) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={newName} onChange={nameChange} required />
                </div>
                <div>
                    number: <input value={newNumber} onChange={numChange} required />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
}

export default PersonForm;