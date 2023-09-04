import { IncomeDetails, Policy } from "../../policies/policy";
import { TaxBrackets, applyTaxBrackets } from "../../policies/utils";

const incomeTaxBrackets: TaxBrackets = [
  { rate: 0 },
  { threshold: 15_000 },
  { rate: 0.2 },
  { threshold: 80_000 },
  { rate: 0.35 },
  { threshold: 180_000 },
  { rate: 0.42 },
  { threshold: 250_000 },
  { rate: 0.45 },
];

export class Top2023 extends Policy<any> {
  override get name() {
    return "TOP 2023";
  }

  override get color() {
    return "#07846f";
  }

  override get references() {
    return [];
  }

  override get description() {
    return ``;
  }

  override get usedFields() {
    return {};
  }

  override calculateAdjustments(totalIncome: number): IncomeDetails {
    return [["Income Tax", -applyTaxBrackets(incomeTaxBrackets, totalIncome)]];
  }
}
