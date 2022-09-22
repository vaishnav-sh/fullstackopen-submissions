import React from "react";

const Filter = ({ value, onChange, text }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        {text}
        <input value={value} onChange={onChange} />
      </p>
    </div>
  );
};

export default Filter;
