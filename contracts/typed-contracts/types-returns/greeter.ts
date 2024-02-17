import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	transferFailed = 'TransferFailed',
	callerNotFound = 'CallerNotFound',
	unauthorized = 'Unauthorized',
	auctionNotFound = 'AuctionNotFound',
	auctionExpired = 'AuctionExpired',
	offerNotFound = 'OfferNotFound',
	wrongDeposit = 'WrongDeposit',
	notAuthorOfOffer = 'NotAuthorOfOffer',
	notAuthorOfAuction = 'NotAuthorOfAuction',
	offerNotAccepted = 'OfferNotAccepted',
	auctionNotInOfferAcceptedState = 'AuctionNotInOfferAcceptedState',
	offerNotAcceptedForAuction = 'OfferNotAcceptedForAuction',
	auctionNotInJobDeliveredState = 'AuctionNotInJobDeliveredState'
}

export type AuctionView = {
	id: number,
	author: AccountId,
	name: string,
	description: string,
	tags: Array<string>,
	createdAt: number,
	expiresAt: number,
	status: AuctionStatus,
	acceptedOffer: number | null
}

export enum AuctionStatus {
	inProgress = 'InProgress',
	offerAccepted = 'OfferAccepted',
	jobAccepted = 'JobAccepted',
	jobDelivered = 'JobDelivered',
	finalized = 'Finalized',
	conflict = 'Conflict'
}

export type OfferView = {
	id: number,
	author: AccountId,
	description: string,
	duration: number,
	reward: ReturnNumber,
	status: AuctionStatus,
	acceptedAt: number | null,
	startedAt: number | null,
	deliveredAt: number | null
}

