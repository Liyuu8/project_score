import { useContext } from 'react';

export function useClient<T>(context: React.Context<T | null>): T {
  const client = useContext(context);
  if (!client) {
    throw new Error('DI failure');
  }

  return client;
}
