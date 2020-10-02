import React, { memo } from 'react';

import { useUserForm } from 'hooks/user';

import { Button, InputField } from 'components';

import './UserForm.scss';

function UserForm({ data, onSubmit }) {
    const isEditMode = !!data?.id;

    const {
        fields,
        changeField: onChangeField,
    } = useUserForm(data);

    const submit = event => {
        event.preventDefault();
        onSubmit(fields);
    };

    return (
        <form className="UserForm" onSubmit={submit}>
            <InputField
                name="name"
                value={fields.name}
                placeholder="Name"
                className="UserForm-InputField"
                onChange={onChangeField}
            />

            <InputField
                name="surname"
                value={fields.surname}
                placeholder="Surname"
                className="UserForm-InputField"
                onChange={onChangeField}
            />

            <InputField
                name="age"
                value={fields.age}
                placeholder="Age"
                className="UserForm-InputField"
                onChange={onChangeField}
            />

            <InputField
                name="city"
                placeholder="City"
                value={fields.city}
                className="UserForm-InputField"
                onChange={onChangeField}
            />

            <Button className="UserForm-Button Button_theme_blue" type="submit">
                {isEditMode ? 'EDIT' : 'ADD'}
            </Button>
        </form>
    )
}

export default memo(UserForm);
