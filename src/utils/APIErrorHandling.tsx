export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }
}

function parseError(statusCode: number, json: any): Error {
  let errorMessage = json.error;

  return new ApiError(statusCode, errorMessage);
}

export async function handleErrorIfNeeded(statusCode: number, json: any) {
  if (statusCode >= 400) {
    throw parseError(statusCode, json);
  }
}
