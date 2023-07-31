export function getDeliveryDate(partNumber=0) {
  // Get the current date
  const today = new Date();
  const randomNumberOfDays = (partNumber % 7); // always in range of 0 to 7
  // Clone the current date and add the random number of days to it
  const randomDate = new Date(today);
  randomDate.setDate(today.getDate() + randomNumberOfDays);
  return randomDate.toISOString().split('T')[0];
}

export function getPrice(partNumber=0) {
  // using part number, generate a number
  let fixedPrice = 10;
  let variablePrice = (partNumber % 30)
  return fixedPrice + variablePrice;
}