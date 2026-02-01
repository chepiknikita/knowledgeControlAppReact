import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class SelfOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userId = Number(req.user.id);
    const paramId = Number(req.params.id);

    if (userId !== paramId) {
      throw new ForbiddenException(
        'Вы можете выполнять это действие только для себя',
      );
    }

    return true;
  }
}
