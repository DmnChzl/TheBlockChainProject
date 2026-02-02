export class StatusError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends StatusError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class NotFoundError extends StatusError {
  constructor(message = "Resource Not Found") {
    super(message, 404);
  }
}

export class ConflictError extends StatusError {
  constructor(message = "Resource Already Exists") {
    super(message, 409);
  }
}

export class InternalServerError extends StatusError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
