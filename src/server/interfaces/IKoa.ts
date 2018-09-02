import { Context as ContextStats } from 'koa';

export type Context = ContextStats;
export type Next = () => void;

export enum ErrorStatus {
	Created = 201,
	NoContent = 204,
}

export interface IRequest {
	body: any;
	id: number;
}
