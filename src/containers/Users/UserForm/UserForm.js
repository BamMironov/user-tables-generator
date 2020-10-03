import React, { memo } from 'react';

import { useUserForm } from 'hooks/user';

import { Button, InputField } from 'components';

import './UserForm.scss';

function UserForm({ data, onSubmit }) {
    const isEditMode = !!data?.id;

    const {
        errors,
        fields,
        submit,
        changeField: onChangeField,
    } = useUserForm(data);

    const doSubmit = event => {
        event.preventDefault();
        submit(onSubmit);
    };

    return (
        <form className="UserForm" onSubmit={doSubmit}>
            <InputField
                name="name"
                value={fields.name}
                errors={errors.name}
                placeholder="Name"
                className="UserForm-InputField"
                onChange={onChangeField}
            />

            <InputField
                name="surname"
                value={fields.surname}
                errors={errors.surname}
                placeholder="Surname"
                className="UserForm-InputField"
                onChange={onChangeField}
            />

            <InputField
                name="age"
                value={fields.age}
                errors={errors.age}
                placeholder="Age"
                className="UserForm-InputField"
                onChange={onChangeField}
            />

            <InputField
                name="city"
                placeholder="City"
                value={fields.city}
                errors={errors.city}
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
