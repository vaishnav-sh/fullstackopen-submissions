const Countries = ({ countries, handleShow }) => {
  return (
    <>
      {countries.map((country) => {
        return (
          <div key={country.name.common}>
            <span>{country.name.common}</span>
            <button onClick={handleShow}>show</button>
          </div>
        );
      })}
    </>
  );
};

export default Countries;
