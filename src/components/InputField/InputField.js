import React from 'react';

import cn from 'classnames';

import { string, func } from 'prop-types';

import './InputField.scss';

function InputField({
    name,
    value,
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
                className="InputField-Input"
            />
        </div>
    )
}

InputField.propTypes = {
    name: string.isRequired,
    onChange: func.isRequired,
}

export default InputField;
