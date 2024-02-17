import type BN from 'bn.js';

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

export type Auction = {
	author: AccountId,
	name: string,
	description: string,
	tags: Array<string>,
	createdAt: (number | string | BN),
	expiresAt: (number | string | BN),
	status: AuctionStatus,
	acceptedOffer: (number | string | BN) | null
}

export enum AuctionStatus {
	inProgress = 'InProgress',
	offerAccepted = 'OfferAccepted',
	jobAccepted = 'JobAccepted',
	jobDelivered = 'JobDelivered',
	finalized = 'Finalized',
	conflict = 'Conflict'
}

export type Offer = {
	author: AccountId,
	description: string,
	duration: (number | string | BN),
	reward: (string | number | BN),
	status: AuctionStatus,
	acceptedAt: (number | string | BN) | null,
	startedAt: (number | string | BN) | null,
	deliveredAt: (number | string | BN) | null
}

