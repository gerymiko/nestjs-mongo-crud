import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export function handleValidationError(error: any): void {
  if (error.name === 'ValidationError') {
    const validationErrors = Object.keys(error.errors).map((key) => ({
      field: key,
      message: error.errors[key].message,
    }));
    throw new HttpException(
      {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Validation failed',
        error: 'Bad Request',
        validationErrors,
      },
      StatusCodes.BAD_REQUEST,
    );
  }
}
