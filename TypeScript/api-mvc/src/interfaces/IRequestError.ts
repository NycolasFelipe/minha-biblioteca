interface IRequestError {
  message: string;
  status: number;
  code?: string;
}

export default IRequestError;