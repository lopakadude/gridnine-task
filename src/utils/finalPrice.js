export const finalPrice = (currentFlight) => {
  return (
    parseInt(currentFlight.flight.price.total.amount, 10) +
    parseInt(currentFlight.flight.price.totalFeeAndTaxes.amount, 10)
  );
};
