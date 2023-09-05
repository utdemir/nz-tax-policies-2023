export function formatNZD(nzd: number): string {
  // group by triplets
  const nzdStr = nzd
    .toFixed(0)
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)!
    .join(",")
    .split("")
    .reverse()
    .join("");
  return "$" + nzdStr;
}
