export interface ApiResponse<T> {
  status: boolean;
  value: T | null;
  msg: string;
}
