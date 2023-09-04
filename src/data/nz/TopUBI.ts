import { IncomeDetails, Policy } from "../../policies/policy";

export class TopUBI extends Policy<any> {
  override get name() {
    return "TOP w/UBI";
  }
  override get color() {
    return "#47c4af";
  }
  override get description() {
    return "";
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
