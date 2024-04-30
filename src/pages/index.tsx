import React, { Suspense } from 'react';
import { trpc } from '../utils/trpc';
import RootLayout from './layout';

const IndexPage = (): JSX.Element => {
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
        <Suspense fallback={<div>Loading...</div>} >
            <p>{hello.data.greeting}</p>
            <button onClick={handleCreateUser}>Create user</button>
            {createUserMutation.isPending && (<>CREATING USER</>)}
        </Suspense>
    </div>
  );
}

IndexPage.getLayout = (page: JSX.Element) => <RootLayout><Suspense fallback={<div>Loading...</div>}>{page}</Suspense></RootLayout>

export default IndexPage;
