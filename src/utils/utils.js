export function formatMoney(amount) {
  return Intl.NumberFormat("en-US").format(amount);
}