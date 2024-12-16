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

    /*
    if (type === "date") {
        return (
            <div>
                <label>{label}</label>
                <input
                    type="date"
                    value={value}
                    onChange={onChange}
                    required={required}
                    max={max}
                />
            </div>
        );
    }

    if (type === "number") {
        return (
            <div>
                <label>{label}</label>
                <input
                    type="number"
                    value={value}
                    onChange={onChange}
                    required={required}
                    min={min}
                    step={step}
                />
            </div>
        );
    }
    // Default case for text or other types
    return (
        <div>
            <label>{label}</label>
            <input
                type={type || "text"}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
    */

    return (
        <div>
            <label>{label}</label>
            <input {...inputProps} />
        </div>
    );
};


export default FormInput;
