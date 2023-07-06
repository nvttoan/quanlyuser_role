export interface ResponseAPI<T>{
    content: T,
    err_code?: number;
    message?: string;
    total?:number;
  }