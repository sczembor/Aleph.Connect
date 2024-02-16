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
	 * @param { (number | string | BN) } duration,
	*/
	"createAuction" (
		name: string,
		description: string,
		tags: Array<string>,
		duration: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "createAuction", [name, description, tags, duration], __options);
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
	 * balanceOf
	 *
	 * @param { ArgumentTypes.AccountId } owner,
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "balanceOf", [owner], __options);
	}

}