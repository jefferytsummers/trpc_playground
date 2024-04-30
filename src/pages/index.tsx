import React from 'react';
import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: 'client' });
  const createUserMutation = trpc.createUser.useMutation()
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  const handleCreateUser = async () => {
    createUserMutation.mutate({ name: 'James F. Reale'})
  }

  return (
    <div>
      <p>{hello.data.greeting}</p>
      <button onClick={handleCreateUser}>Create user</button>
      {createUserMutation.isPending && (<>CREATING USER</>)}
    </div>
  );
}