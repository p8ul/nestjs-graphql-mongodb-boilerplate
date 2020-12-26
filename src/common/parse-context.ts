import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

export interface GraphQLContext {
  req: Request;
  res: Response;
  info: GraphQLResolveInfo;
}
/**
 * Parses in the Nest Execution context of the incoming request
 */
export function parseContext(context: ExecutionContext): GraphQLContext {
  const graphQLContext = GqlExecutionContext.create(
    context as ExecutionContext,
  );
  const info = graphQLContext.getInfo();
  let req: Request;
  let res: Response;

  if (info) {
    const ctx = graphQLContext.getContext();
    req = ctx.req;
    res = ctx.res;
  } else {
    req = context.switchToHttp().getRequest() as Request;
    res = context.switchToHttp().getResponse();
  }

  return {
    req,
    res,
    info,
  };
}
