import React from 'react';

const FormInput = ({ label, type, value, onChange, required, min }) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                min={min}
            />
        </div>
    );
};

export default FormInput;
