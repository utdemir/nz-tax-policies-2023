import { Labour2023 } from "./Labour2023";
import { National2023 } from "./National2023";
import { Top2023 } from "./Top2023";
import { TopUBI } from "./TopUBI";
import { Act2023 } from "./Act2023";
import { INCOME_DISTRIBUTION_2021 } from "./incomes";
import { Policy } from "../../policies/policy";

export const all: Policy<any>[] = [
  new Labour2023({}, INCOME_DISTRIBUTION_2021),
  new National2023({}, INCOME_DISTRIBUTION_2021),
  new Top2023({}, INCOME_DISTRIBUTION_2021),
  new TopUBI({}, INCOME_DISTRIBUTION_2021),
  new Act2023({}, INCOME_DISTRIBUTION_2021),
];
