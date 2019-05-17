import { types as sdkTypes } from "../../util/sdkLoader";
import Decimal from "decimal.js";
import {
    unitDivisor,
    convertMoneyToNumber,
    convertUnitToSubUnit
  } from "../../util/currency";
import { LINE_ITEM_UNITS } from "../../util/types";

const { Money, UUID } = sdkTypes;

export const createProviderLineItems = (listingResponse, txResponse) => {
    const listing = listingResponse.data.data;
    const tx = txResponse.data.data;
    const groupSizeMax = listing && listing.attributes.publicData.group_size_max ? listing.attributes.publicData.group_size_max : 1;
    const { price_scheme, seats } = txResponse.data.data.attributes.protectedData;
    const quantity = price_scheme === 'group_seats' ? (parseInt(seats / groupSizeMax) + (seats % groupSizeMax !== 0 ? 1 : 0)) : seats
    const totalPrice = estimatedTotalPrice(listing.attributes.price, quantity);
    const items = [
        {
            code: LINE_ITEM_UNITS,
            reversal: false,
            includeFor: ['customer', 'provider'],
            unitPrice: listing.attributes.price,
            lineTotal: totalPrice,
            quantity: new Decimal(quantity)
        }
    ];
    return {
        attributes: {
            payinTotal: totalPrice,
            payoutTotal: totalPrice
        },
        lineItems: items
    }
}


export const createRefundLineItems = (listingResponse, txResponse) => {
  const listing = listingResponse.data.data;
  const tx = txResponse.data.data;
  const groupSizeMax = listing && listing.attributes.publicData.group_size_max ? listing.attributes.publicData.group_size_max : 1;
  const { price_scheme, seats } = txResponse.data.data.attributes.protectedData;
  const quantity = price_scheme === 'group_seats' ? (parseInt(seats / groupSizeMax) + (seats % groupSizeMax !== 0 ? 1 : 0)) : seats
  const totalPrice = estimatedTotalPrice(listing.attributes.price, quantity);
  const items = [
      {
          code: LINE_ITEM_UNITS,
          reversal: false,
          includeFor: ['customer', 'provider'],
          unitPrice: listing.attributes.price,
          lineTotal: totalPrice,
          quantity: new Decimal(quantity)
      },
      {
        code: LINE_ITEM_UNITS,
        reversal: true,
        includeFor: ['customer', 'provider'],
        unitPrice: listing.attributes.price,
        lineTotal: totalPrice,
        quantity: new Decimal(quantity)
    },
  ];
  return {
      attributes: {
          payinTotal: new Money(0, listing.attributes.price.currency),
          payoutTotal: new Money(0, listing.attributes.price.currency)
      },
      lineItems: items
  }
}


const estimatedTotalPrice = (unitPrice, unitCount) => {
    const numericPrice = convertMoneyToNumber(unitPrice);
    const numericTotalPrice = new Decimal(numericPrice)
      .times(unitCount)
      .toNumber();
    return new Money(
      convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
      unitPrice.currency
    );
  };