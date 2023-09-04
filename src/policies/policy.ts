import { Color } from "chart.js";
import { PLOT_SIZE } from "../constants";
import { IncomeDistributionBracket } from "../data/nz/incomes";

export type ToggleableFields = {
  kidCount: number;
};

export type IncomeDetails = [string, number][];

type MapToNull<T> = {
  [K in keyof T]: null;
};

export abstract class Policy<T extends keyof ToggleableFields> {
  constructor(
    private readonly toggles: Pick<ToggleableFields, T>,
    private readonly incomeDistribution: IncomeDistributionBracket[]
  ) {}

  abstract get name(): string;
  abstract get description(): string;
  abstract get references(): string[];
  abstract get color(): Color;
  abstract get usedFields(): MapToNull<Omit<ToggleableFields, T>>;

  abstract calculateAdjustments(totalIncome: number): IncomeDetails;

  calculateNetIncome(totalIncome: number): number {
    return totalIncome + this.calculateTotalAdjustment(totalIncome);
  }

  calculateTotalAdjustment(totalIncome: number): number {
    const taxes = this.calculateAdjustments(totalIncome);
    let tax = 0;
    for (const [_name, amount] of taxes) {
      tax += amount;
    }
    return tax;
  }

  _netIncomeDataCache: number[] | null = null;
  netIncomeData(): number[] {
    if (this._netIncomeDataCache) {
      return this._netIncomeDataCache;
    }

    const income = new Array(PLOT_SIZE);
    for (let i = 0; i < PLOT_SIZE; i++) {
      income[i] = this.calculateNetIncome(i * 1000);
    }

    this._netIncomeDataCache = income;
    return income;
  }

  _nationwideTaxCache: number | null = null;
  nationwideTax(): number {
    if (this._nationwideTaxCache) {
      return this._nationwideTaxCache;
    }

    const remaining = [];

    let ret = 0;
    for (const bracket of this.incomeDistribution) {
      if (bracket.lower && bracket.upper) {
        const mid = (bracket.lower + bracket.upper) / 2;
        const adj = this.calculateTotalAdjustment(mid) * bracket.population;
        ret += adj;
        if (this.name.startsWith("Labour")) {
          console.log(this.name, mid, bracket.population, adj);
        }
      }
    }

    return ret;
  }
}
