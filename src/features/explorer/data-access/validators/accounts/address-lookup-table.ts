/* eslint-disable @typescript-eslint/no-redeclare */

import { array, enums, Infer, number, optional, type } from 'superstruct'
import { BigIntFromString, NumberFromString } from '../number'
import { PublicKeyFromString } from '../pubkey'

export type AddressLookupTableAccountType = Infer<typeof AddressLookupTableAccountType>
export const AddressLookupTableAccountType = enums(['uninitialized', 'lookupTable'])

export type AddressLookupTableAccountInfo = Infer<typeof AddressLookupTableAccountInfo>
export const AddressLookupTableAccountInfo = type({
  addresses: array(PublicKeyFromString),
  authority: optional(PublicKeyFromString),
  deactivationSlot: BigIntFromString,
  lastExtendedSlot: NumberFromString,
  lastExtendedSlotStartIndex: number(),
})

export type ParsedAddressLookupTableAccount = Infer<typeof ParsedAddressLookupTableAccount>
export const ParsedAddressLookupTableAccount = type({
  info: AddressLookupTableAccountInfo,
  type: AddressLookupTableAccountType,
})
