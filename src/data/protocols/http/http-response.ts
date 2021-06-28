export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  notFound = 404,
  unauthorized = 401,
  serverErrror = 500,
}

export type HttpResponse<BodyType> = {
  statusCode: HttpStatusCode
  body?: BodyType
};
