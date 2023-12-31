import { IncomeDetails, Policy } from "../../policies/policy";
import {
  TaxBrackets,
  applyTaxBrackets,
  independentEarnerTaxCredit,
  prettyTaxBrackets,
} from "../../policies/utils";

const incomeTaxBrackets: TaxBrackets = [
  { rate: 0.105 },
  { threshold: 15_600 },
  { rate: 0.175 },
  { threshold: 53_500 },
  { rate: 0.3 },
  { threshold: 78_100 },
  { rate: 0.33 },
  { threshold: 180_000 },
  { rate: 0.39 },
];
export class National2023 extends Policy<any> {
  override get name() {
    return "National 2023";
  }

  override get description() {
    return [
      {
        type: "tax_brackets" as const,
        value: prettyTaxBrackets(incomeTaxBrackets),
      },
    ];
  }

  override get references() {
    return ["https://national2023.com"];
  }

  override get color() {
    return "#0000ff";
  }

  override get usedFields() {
    return {};
  }

  override calculateAdjustments(totalIncome: number): IncomeDetails {
    const ret: IncomeDetails = [];
    ret.push(["Income Tax", -applyTaxBrackets(incomeTaxBrackets, totalIncome)]);

    const ietc = independentEarnerTaxCredit(
      totalIncome,
      24_000,
      66_000,
      70_000
    );
    if (ietc > 0) {
      ret.push(["Independent Earner Tax Credit", ietc]);
    }

    return ret;
  }
}
