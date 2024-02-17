/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/greeter';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
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
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "createAuction", [name, description, tags], __options);
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
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "acceptOffer", [auctionId, offerId], __options);
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
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "acceptJob", [auctionId, offerId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "deliverJob", [auctionId, offerId], __options);
	}

	/**
	 * confirmJobDelivery
	 *
	 * @param { (number | string | BN) } auctionId,
	 * @param { (number | string | BN) } offerId,
	 * @param { boolean } completed,
	*/
	"confirmJobDelivery" (
		auctionId: (number | string | BN),
		offerId: (number | string | BN),
		completed: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "confirmJobDelivery", [auctionId, offerId, completed], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "createOffer", [description, duration, reward, auctionId], __options);
	}

	/**
	 * admin
	 *
	*/
	"admin" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "admin", [], __options);
	}

	/**
	 * userAuctions
	 *
	 * @param { ArgumentTypes.AccountId } user,
	*/
	"userAuctions" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "userAuctions", [user], __options);
	}

	/**
	 * userOffers
	 *
	 * @param { ArgumentTypes.AccountId } user,
	*/
	"userOffers" (
		user: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "userOffers", [user], __options);
	}

	/**
	 * getOfferReward
	 *
	 * @param { (number | string | BN) } offerId,
	*/
	"getOfferReward" (
		offerId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getOfferReward", [offerId], __options);
	}

	/**
	 * auctionOffers
	 *
	 * @param { (number | string | BN) } auctionId,
	*/
	"auctionOffers" (
		auctionId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "auctionOffers", [auctionId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "reversedAuctions", [fromIndex, limit], __options);
	}

	/**
	 * mediator
	 *
	*/
	"mediator" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "mediator", [], __options);
	}

	/**
	 * setAdmin
	 *
	 * @param { ArgumentTypes.AccountId } newAdmin,
	*/
	"setAdmin" (
		newAdmin: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "setAdmin", [newAdmin], __options);
	}

	/**
	 * balance
	 *
	*/
	"balance" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "balance", [], __options);
	}

}