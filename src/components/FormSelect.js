import React from 'react';

const FormSelect = ({ label, value, onChange, required, options }) => {
    return (
        <div>
            <label>{label}</label>
            <select value={value} onChange={onChange} required={required}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;
