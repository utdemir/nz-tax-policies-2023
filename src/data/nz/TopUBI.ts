import { IncomeDetails, Policy } from "../../policies/policy";

export class TopUBI extends Policy<any> {
  override get name() {
    return "TOP w/UBI";
  }
  override get color() {
    return "#47c4af";
  }
  override get description() {
    return [
      { type: "text" as const, value: "Flat tax: %35" },
      { type: "text" as const, value: "UBI: $16,500" },
    ];
  }
  override get usedFields() {
    return {};
  }
  override get references() {
    return [];
  }
  override calculateAdjustments(totalIncome: number): IncomeDetails {
    return [
      ["Income Tax", -totalIncome * 0.35],
      ["UBI", 16500],
    ];
  }
}
