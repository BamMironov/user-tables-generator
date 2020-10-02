import { User } from 'entity';

import { useForm } from 'hooks';

function useUserForm(initialData) {
  return useForm('USER', User(initialData));
}

export default useUserForm;
