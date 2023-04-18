import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownRequestErrorFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'P2002') {
      return response.status(409).json({
        statusCode: 409,
        message: `Duplicate entry for ${exception.meta.target}`,
      });
    } else if (exception.code === 'P2025') {
      return response.status(404).json({
        statusCode: 404,
        message: 'Unique identifier not found',
      });
    } else {
      return response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
