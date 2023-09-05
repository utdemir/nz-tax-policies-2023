// Source: https://web.archive.org/web/20230329043004/https://www.ird.govt.nz/about-us/tax-statistics/revenue-refunds/revenue-collected-2001-to-2022
import tableRaw from "./income_tables_2001_21.tsv?raw";

const table = tableRaw.split("\n").map((line) => line.split("\t"));

// 4th line is the years, 8th line is where the data starts, ends on 230th (inclusive)
const row_years = table[3];
const row_headers = table[4];

const matrix_data = table.slice(7, 230);

// Extract the population data for 2021
const start_year = "2001";
const col_2021 = row_years.indexOf("2021");

assert(row_years[1] === start_year, "year row 1");
assert(row_years[col_2021] === "2021", "year row 2021");
assert(row_headers[col_2021] === "Number of People", "header row 2021");

const number_of_people_2021 = matrix_data.map((row) => {
  const c = row[col_2021];
  const r = /^"?([0-9,]+)"?$/.exec(c);
  if (r) {
    return parseInt(r[1].replace(",", ""));
  } else {
    throw new Error(`Unknown number of people: ${c}`);
  }
});

const taxable_income_2021 = matrix_data.map((row) => {
  const c = row[col_2021 + 1];
  const r = /^"?([0-9\.,]+)"?$/.exec(c);
  if (r) {
    return parseFloat(r[1].replace(",", "")) * 1_000_000;
  } else {
    throw new Error(`Unknown taxable income: ${c}`);
  }
});

assert(
  taxable_income_2021.reduce((acc, d) => acc + d, 0) === 217_030_400_000,
  "total taxable income"
);

// Extract the brackets
const brackets_raw = matrix_data.map((row) => row[56]);
assert(brackets_raw[0] === "nil", "first bracket is nil");

// We ignore the nil
assert(brackets_raw.length === number_of_people_2021.length, "brackets length");

const brackets = brackets_raw.map((c) => {
  if (c === "nil") {
    return { lower: 0, upper: 0 };
  }

  const over = /Over \$([0-9,]+)/.exec(c);
  if (over) {
    const lower = parseInt(over[1].replace(",", ""));
    return { lower };
  }

  const br = /\$([0-9\.,]+) *- *\$([0-9,]+)/.exec(c);
  if (br) {
    const lower = parseFloat(br[1].replace(",", ""));
    const upper = parseFloat(br[2].replace(",", ""));
    return { lower, upper };
  }

  throw new Error(`Unknown bracket: ${JSON.stringify(c)}`);
});

assert(brackets[0].lower === 0, "first bracket is 0");
assert(brackets[1].lower === 0.01, "second bracket is 0.01");
assert(
  brackets[brackets.length - 1].lower === 300000,
  "last bracket is 300000"
);
assert(
  brackets[brackets.length - 1].upper === undefined,
  "last bracket is unbounded"
);

// Zip!
export type IncomeDistributionBracket = {
  lower: number;
  upper?: number;
  population: number;
};

export const INCOME_DISTRIBUTION_2021: IncomeDistributionBracket[] =
  brackets.map((br, i) => ({
    lower: br.lower,
    upper: br.upper,
    population: number_of_people_2021[i],
  }));

const totalPopulation = INCOME_DISTRIBUTION_2021.reduce(
  (acc, d) => acc + d.population,
  0
);
assert(totalPopulation === 4_362_650, "total population");

// Utils
function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}
