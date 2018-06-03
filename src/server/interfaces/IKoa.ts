export interface ContextStats {
    status: number;
    body: object;
    params: object;
    request: object;
}

export enum ErrorStatus{
    Created = 201,
    NoContent = 204
}

export interface IRequest{
    body: any;
    id: number;
}
