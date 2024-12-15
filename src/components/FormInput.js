import React from 'react';

const FormInput = ({ label, type, value, onChange, required, min, max, step }) => {
    const inputProps = {
        type,
        value,
        onChange,
        required,
        min,
        max,
        step,
    };

    return (
        <div>
            <label>{label}</label>
            <input {...inputProps} />
        </div>
    );
};


export default FormInput;
