/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/greeter';
import type * as ReturnTypes from '../types-returns/greeter';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/greeter.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/greeter.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* createAuction
	*
	* @param { string } name,
	* @param { string } description,
	* @param { Array<string> } tags,
	* @returns { void }
	*/
	"createAuction" (
		name: string,
		description: string,
		tags: Array<string>,
		__options: GasLimitAndRequiredValue,
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
	* @returns { void }
	*/
	"acceptOffer" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options: GasLimitAndRequiredValue,
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
	* @returns { void }
	*/
	"acceptJob" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options: GasLimitAndRequiredValue,
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
	* @returns { void }
	*/
	"deliverJob" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"confirmJobDelivery" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"rejectJobDelivery" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"createOffer" (
		description: string,
		duration: (number | string | BN),
		reward: (string | number | BN),
		auctionId: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"resolveConflict" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		resolution: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "resolveConflict", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [auctionId, offerId, resolution], __options);
	}

	/**
	* admin
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"admin" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "admin", [], __options, (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* userAuctions
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<Array<ReturnTypes.AuctionView>, ReturnTypes.LangError> }
	*/
	"userAuctions" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.AuctionView>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "userAuctions", [user], __options, (result) => { return handleReturnType(result, getTypeDescription(16, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* userOffers
	*
	* @param { ArgumentTypes.AccountId } user,
	* @returns { Result<Array<ReturnTypes.OfferView>, ReturnTypes.LangError> }
	*/
	"userOffers" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.OfferView>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "userOffers", [user], __options, (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOfferReward
	*
	* @param { (number | string | BN) } offerId,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getOfferReward" (
		offerId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getOfferReward", [offerId], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* auctionOffers
	*
	* @param { (number | string | BN) } auctionId,
	* @returns { Result<Array<ReturnTypes.OfferView>, ReturnTypes.LangError> }
	*/
	"auctionOffers" (
		auctionId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.OfferView>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "auctionOffers", [auctionId], __options, (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* reversedAuctions
	*
	* @param { (number | string | BN) } fromIndex,
	* @param { (number | string | BN) } limit,
	* @returns { Result<Array<ReturnTypes.AuctionView>, ReturnTypes.LangError> }
	*/
	"reversedAuctions" (
		fromIndex: (number | string | BN),
		limit: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.AuctionView>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "reversedAuctions", [fromIndex, limit], __options, (result) => { return handleReturnType(result, getTypeDescription(16, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* auction
	*
	* @param { (number | string | BN) } id,
	* @returns { Result<ReturnTypes.AuctionView | null, ReturnTypes.LangError> }
	*/
	"auction" (
		id: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AuctionView | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "auction", [id], __options, (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* offer
	*
	* @param { (number | string | BN) } id,
	* @returns { Result<ReturnTypes.OfferView | null, ReturnTypes.LangError> }
	*/
	"offer" (
		id: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.OfferView | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "offer", [id], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* mediator
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"mediator" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "mediator", [], __options, (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* balance
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"balance" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "balance", [], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setAdmin
	*
	* @param { ArgumentTypes.AccountId } newAdmin,
	* @returns { void }
	*/
	"setAdmin" (
		newAdmin: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setAdmin", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newAdmin], __options);
	}

}