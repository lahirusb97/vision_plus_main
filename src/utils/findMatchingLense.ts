import { LenseModel } from "../model/LenseModel";

export const findMatchingLense = (searchParams, lensData: LenseModel[]) => {
  return lensData.filter((lens) => {
    const { brand, type, coating, powers } = lens;
    const { brand_id, type_id, coating_id, sph, cyl, side } = searchParams;

    // Match the brand, type, and coating
    const isBrandMatch = brand === brand_id;
    const isTypeMatch = type === type_id;
    const isCoatingMatch = coating === coating_id;

    // Match powers (sph and cyl)
    const isSphMatch = powers.some((power) => power.value === sph);
    const isCylMatch = cyl ? powers.some((power) => power.value === cyl) : true;

    // Handle side logic based on type_id
    let isSideMatch = true;
    if (type_id === 2 || type_id === 3) {
      isSideMatch = powers.some((power) => power.side === side);
    } else if (type_id === 1) {
      // type_id 1 should have side null
      isSideMatch = powers.every((power) => power.side === null);
    }

    // Check if the powers match the specified IDs based on type_id
    let isPowerMatch = true;
    if (type_id === 1) {
      // For type_id 1, only power 1 and 2 should exist
      const validPowers = [1, 2];
      isPowerMatch = powers.every((power) => validPowers.includes(power.power));
    } else if (type_id === 2 || type_id === 3) {
      // For type_id 2 and 3, only power 2 and 3 should exist
      const validPowers = [1, 3];
      isPowerMatch = powers.every((power) => validPowers.includes(power.power));
    }

    // Return true if all conditions match
    return (
      isBrandMatch &&
      isTypeMatch &&
      isCoatingMatch &&
      isSphMatch &&
      isCylMatch &&
      isSideMatch &&
      isPowerMatch
    );
  });
};
