/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/greeter';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/greeter.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* createAuction
	*
	* @param { string } name,
	* @param { string } description,
	* @param { Array<string> } tags,
	*/
	"createAuction" (
		name: string,
		description: string,
		tags: Array<string>,
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "createAuction", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [name, description, tags], __options);
	}

	/**
	* acceptOffer
	*
	* @param { (number | string | BN) } auctionId,
	* @param { (number | string | BN) } offerId,
	*/
	"acceptOffer" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "acceptOffer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [auctionId, offerId], __options);
	}

	/**
	* acceptJob
	*
	* @param { (number | string | BN) } auctionId,
	* @param { (number | string | BN) } offerId,
	*/
	"acceptJob" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "acceptJob", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [auctionId, offerId], __options);
	}

	/**
	* deliverJob
	*
	* @param { (number | string | BN) } auctionId,
	* @param { (number | string | BN) } offerId,
	*/
	"deliverJob" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "deliverJob", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [auctionId, offerId], __options);
	}

	/**
	* confirmJobDelivery
	*
	* @param { (number | string | BN) } auctionId,
	* @param { (number | string | BN) } offerId,
	*/
	"confirmJobDelivery" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "confirmJobDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [auctionId, offerId], __options);
	}

	/**
	* rejectJobDelivery
	*
	* @param { (number | string | BN) } auctionId,
	* @param { (number | string | BN) } offerId,
	*/
	"rejectJobDelivery" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "rejectJobDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [auctionId, offerId], __options);
	}

	/**
	* createOffer
	*
	* @param { string } description,
	* @param { (number | string | BN) } duration,
	* @param { (string | number | BN) } reward,
	* @param { (number | string | BN) } auctionId,
	*/
	"createOffer" (
		description: string,
		duration: (number | string | BN),
		reward: (string | number | BN),
		auctionId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "createOffer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [description, duration, reward, auctionId], __options);
	}

	/**
	* resolveConflict
	*
	* @param { (number | string | BN) } auctionId,
	* @param { (number | string | BN) } offerId,
	* @param { (number | string | BN) } resolution,
	*/
	"resolveConflict" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		resolution: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "resolveConflict", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [auctionId, offerId, resolution], __options);
	}

	/**
	* admin
	*
	*/
	"admin" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "admin", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* userAuctions
	*
	* @param { ArgumentTypes.AccountId } user,
	*/
	"userAuctions" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "userAuctions", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [user], __options);
	}

	/**
	* userOffers
	*
	* @param { ArgumentTypes.AccountId } user,
	*/
	"userOffers" (
		user: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "userOffers", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [user], __options);
	}

	/**
	* getOfferReward
	*
	* @param { (number | string | BN) } offerId,
	*/
	"getOfferReward" (
		offerId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getOfferReward", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [offerId], __options);
	}

	/**
	* auctionOffers
	*
	* @param { (number | string | BN) } auctionId,
	*/
	"auctionOffers" (
		auctionId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "auctionOffers", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [auctionId], __options);
	}

	/**
	* reversedAuctions
	*
	* @param { (number | string | BN) } fromIndex,
	* @param { (number | string | BN) } limit,
	*/
	"reversedAuctions" (
		fromIndex: (number | string | BN),
		limit: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "reversedAuctions", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [fromIndex, limit], __options);
	}

	/**
	* auction
	*
	* @param { (number | string | BN) } id,
	*/
	"auction" (
		id: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "auction", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [id], __options);
	}

	/**
	* offer
	*
	* @param { (number | string | BN) } id,
	*/
	"offer" (
		id: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "offer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [id], __options);
	}

	/**
	* mediator
	*
	*/
	"mediator" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "mediator", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* balance
	*
	*/
	"balance" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "balance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setAdmin
	*
	* @param { ArgumentTypes.AccountId } newAdmin,
	*/
	"setAdmin" (
		newAdmin: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setAdmin", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newAdmin], __options);
	}

}