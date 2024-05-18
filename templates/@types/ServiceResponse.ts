export interface ServiceResponse<T> {
    status: number;
    data?: T;
    message?: string;
}