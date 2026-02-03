export function getErrorMessage(error: unknown): string {
  const err = error as any;

  return (
    err?.response?.data?.message ||
    err?.message ||
    'Ошибка выполнения запроса'
  );
}