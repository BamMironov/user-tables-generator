import React from 'react';

import cn from 'classnames';

import { string, func } from 'prop-types';

import './InputField.scss';

function InputField({
    name,
    value,
    errors,
    onChange,
    className,
    type = 'text',
    placeholder = '',
}) {
    function handleChange(event) {
        onChange(name, event.target.value);
    }

    return (
        <div className={cn('InputField', className)}>
            <input
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={cn(
                    'InputField-Input',
                    { 'InputField-Input_Invalid': !!errors }
                )}
            />

            {errors?.map((error, index) => (
                <div key={index} className="InputField-Error">
                    {error}
                </div>
            ))}
        </div>
    )
}

InputField.propTypes = {
    name: string.isRequired,
    onChange: func.isRequired,
}

export default InputField;
