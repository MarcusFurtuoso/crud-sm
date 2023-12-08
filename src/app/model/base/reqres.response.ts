export interface ReqresResponse<T> {
  data: T;
  support: {
    url: string;
    text: string;
  };
}
