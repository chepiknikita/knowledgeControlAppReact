interface ApiError {
  response?: { data?: { message?: string } };
  message?: string;
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const err = error as ApiError;
    return err.response?.data?.message ?? err.message ?? 'Ошибка выполнения запроса';
  }
  return 'Ошибка выполнения запроса';
}
