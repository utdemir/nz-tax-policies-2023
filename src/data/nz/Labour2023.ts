import { IncomeDetails, Policy } from "../../policies/policy";
import {
  TaxBrackets,
  applyTaxBrackets,
  prettyTaxBrackets,
} from "../../policies/utils";

const incomeTaxBrackets: TaxBrackets = [
  { rate: 0.105 },
  { threshold: 14_000 },
  { rate: 0.175 },
  { threshold: 48_000 },
  { rate: 0.3 },
  { threshold: 70_000 },
  { rate: 0.33 },
  { threshold: 180_000 },
  { rate: 0.39 },
];

export class Labour2023 extends Policy<any> {
  get usedFields() {
    return {};
  }

  get name() {
    return "Labour 2023";
  }

  get color() {
    return "#ff0000";
  }

  get references() {
    return [];
  }

  get description() {
    return `${prettyTaxBrackets(incomeTaxBrackets)}`;
  }

  override calculateAdjustments(totalIncome: number): IncomeDetails {
    const ret: IncomeDetails = [];
    ret.push(["Income Tax", -applyTaxBrackets(incomeTaxBrackets, totalIncome)]);

    let ietc = 0;
    if (totalIncome >= 24_000 && totalIncome <= 44_000) {
      ietc = 10 * 52;
    } else if (totalIncome > 44_000 && totalIncome < 48_000) {
      ietc = 10 * 52 - (totalIncome - 44_000) * 0.13;
    }
    if (ietc > 0) {
      // ret.push(["Independent Earner Tax Credit", ietc]);
    }

    return ret;
  }
}
