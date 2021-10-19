// round a number at 'decimalNumber' number after comma
export const roundNumber = (number, decimalNumber=2) => {

let temp = Math.pow(10,decimalNumber);

return Math.round(number*temp)/temp
};