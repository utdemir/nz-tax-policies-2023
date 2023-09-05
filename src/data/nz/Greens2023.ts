import { IncomeDetails, Policy } from "../../policies/policy";
import {
  TaxBrackets,
  applyTaxBrackets,
  independentEarnerTaxCredit,
  prettyTaxBrackets,
} from "../../policies/utils";

const incomeTaxBrackets: TaxBrackets = [
  { rate: 0 },
  { threshold: 10_000 },
  { rate: 0.17 },
  { threshold: 50_000 },
  { rate: 0.3 },
  { threshold: 75_000 },
  { rate: 0.35 },
  { threshold: 120_000 },
  { rate: 0.39 },
  { threshold: 180_000 },
  { rate: 0.45 },
];

export class Greens2023 extends Policy<any> {
  override get usedFields() {
    return {};
  }

  override get name() {
    return "Greens 2023";
  }

  override get color() {
    return "#00c760";
  }

  override get references() {
    return [];
  }

  override get description() {
    return [
      {
        type: "tax_brackets" as const,
        value: prettyTaxBrackets(incomeTaxBrackets),
      },
    ];
  }

  override calculateAdjustments(totalIncome: number): IncomeDetails {
    const ret: IncomeDetails = [];
    ret.push(["Income Tax", -applyTaxBrackets(incomeTaxBrackets, totalIncome)]);

    const ietc = independentEarnerTaxCredit(
      totalIncome,
      24_000,
      44_000,
      48_000
    );
    if (ietc > 0) {
      // ret.push(["Independent Earner Tax Credit", ietc]);
    }

    return ret;
  }
}
