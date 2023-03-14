export default interface IHttpResponse<T> {
  statusCode: number,
  body: T
}