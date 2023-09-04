// Tax Brackets

import { PLOT_SIZE } from "../constants";

type Rate = { rate: number };
type Threshold = { threshold: number };
type Pair = [Threshold, Rate];

export type TaxBrackets =
  | [Rate]
  | [Rate, ...Pair]
  | [Rate, ...Pair, ...Pair]
  | [Rate, ...Pair, ...Pair, ...Pair]
  | [Rate, ...Pair, ...Pair, ...Pair, ...Pair]
  | [Rate, ...Pair, ...Pair, ...Pair, ...Pair, ...Pair]
  | [Rate, ...Pair, ...Pair, ...Pair, ...Pair, ...Pair, ...Pair]
  | [Rate, ...Pair, ...Pair, ...Pair, ...Pair, ...Pair, ...Pair, ...Pair];

export function applyTaxBrackets(
  brackets: TaxBrackets,
  income: number
): number {
  function go(lower: number, bs: TaxBrackets): number {
    if (income < lower) return 0;

    if (bs.length === 1) {
      const [{ rate: r }] = bs;
      return (income - lower) * r;
    } else {
      const [{ rate: r1 }, { threshold: upper }, ...rest] = bs;
      if (income < upper) {
        return (income - lower) * r1;
      } else {
        return (upper - lower) * r1 + go(upper, rest);
      }
    }
  }

  return go(0, brackets);
}

type PrettyTaxBrackets = {
  lower: number;
  upper?: number;
  rate: number;
};

export function prettyTaxBrackets(brackets: TaxBrackets): string {
  const ret: PrettyTaxBrackets[] = [];

  function go(lower: number, bs: TaxBrackets) {
    if (bs.length === 1) {
      const [{ rate: r }] = bs;
      ret.push({ lower, upper: Infinity, rate: r });
    } else {
      const [{ rate: r1 }, { threshold: upper }, ...rest] = bs;
      ret.push({ lower, upper, rate: r1 });
      go(upper, rest);
    }
  }

  go(0, brackets);

  return ret
    .map(
      ({ lower, upper, rate }) =>
        `lower: ${lower}, upper: ${upper}, rate: ${rate}`
    )
    .join("\n");
}

// Income plot

export const INCOME_DATA_LABELS = new Array(PLOT_SIZE)
  .fill(0)
  .map((_, i) => i * 1000);
