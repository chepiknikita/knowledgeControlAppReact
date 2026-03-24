import { useCallback, useState } from 'react';
import { getErrorMessage } from '../utils/getErrorMessage';

type AsyncOptions = {
  withLoading?: boolean;
};

export function useAsyncAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (
      fn: () => Promise<void>,
      options: AsyncOptions = {}
    ) => {
      const { withLoading = true } = options;

      try {
        setError(null);

        if (withLoading) {
          setLoading(true);
        }

        await fn();
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        if (withLoading) {
          setLoading(false);
        }
      }
    },
    []
  );

  return {
    run,
    loading,
    error,
    setError,
  };
}
