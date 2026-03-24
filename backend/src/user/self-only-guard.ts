import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

const SELF_ONLY_MESSAGE = 'Вы можете выполнять это действие только для себя';

@Injectable()
export class SelfOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new ForbiddenException(SELF_ONLY_MESSAGE);
    }

    const userId = Number(req.user.id);
    const paramId = Number(req.params.id);

    if (isNaN(userId) || isNaN(paramId) || userId !== paramId) {
      throw new ForbiddenException(SELF_ONLY_MESSAGE);
    }

    return true;
  }
}
