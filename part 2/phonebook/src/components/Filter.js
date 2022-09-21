import React from "react"

const Filter = ({ value, onChange, text }) => {
    return (<p>{text}
        <input value={value} onChange={onChange} />
    </p>)
}

export default Filter