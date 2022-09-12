export const useNumberFormatter = () => {
  const asString = (value: number) => {
    if (value > 1_000) {
      const thousands = Math.floor(value / 1000);
      const hundreds = Math.round(Math.floor((value - (thousands * 1000)) / 100));
      return `${thousands}.${hundreds}k`;
    }

    return `${value}`;
  };

  const roundToPlaces = (value: number, places: number = 2) => {
    const multiplier = 10 ** places;
    const floatValue = parseFloat((value * multiplier).toFixed(11));
    const rounded = Math.round(floatValue) / multiplier;
    return rounded;
  };

  return { asString, roundToPlaces };
};
