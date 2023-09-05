import { IncomeDetails, Policy } from "../../policies/policy";
import {
  TaxBrackets,
  applyTaxBrackets,
  prettyTaxBrackets,
} from "../../policies/utils";

const incomeTaxBrackets: TaxBrackets = [
  { rate: 0.175 },
  { threshold: 70_000 },
  { rate: 0.28 },
];

export class Act2023 extends Policy<any> {
  get name() {
    return "ACT 2023";
  }

  get color() {
    return "#ffdf00";
  }

  override get description() {
    return [
      {
        type: "tax_brackets" as const,
        value: prettyTaxBrackets(incomeTaxBrackets),
      },
    ];
  }

  get references() {
    return [];
  }

  get usedFields() {
    return {};
  }

  override calculateAdjustments(totalIncome: number): IncomeDetails {
    return [["Income Tax", -applyTaxBrackets(incomeTaxBrackets, totalIncome)]];
  }
}
