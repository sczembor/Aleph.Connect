import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type Auction = {
	name: string,
	description: string,
	tags: Array<string>,
	duration: (number | string | BN)
}

