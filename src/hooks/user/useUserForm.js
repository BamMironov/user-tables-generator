import { User } from 'entity';

import { useForm } from 'hooks';

import { UserScheme } from 'schemes';

function useUserForm(initialData) {
  return useForm('USER', User(initialData), UserScheme);
}

export default useUserForm;
