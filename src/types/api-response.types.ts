export interface ApiResponse<T = null> {
  message: string
  statusCode: number
  data?: T
}
