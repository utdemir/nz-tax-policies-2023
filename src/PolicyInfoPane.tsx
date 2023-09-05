import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Policy, PolicyDescription } from "./policies/policy";
import { formatNZD } from "./utils";

export function PolicyInfoPane(props: { policy: Policy<any> }) {
  return (
    <Card
      variant="outlined"
      style={{ border: `1px solid ${props.policy.color.toString()}` }}
    >
      <CardContent>
        <h2>{props.policy.name}</h2>
        <p>Total Profit: {ppBillions(-props.policy.nationwideTax())}</p>
        {props.policy.description.map((d) => (
          <Descr data={d} />
        ))}
      </CardContent>
    </Card>
  );
}

function Descr(props: { data: PolicyDescription }) {
  if (props.data.type === "tax_brackets") {
    return <DescTaxBracket bracket={props.data.value} />;
  } else {
    return <p>{props.data.value}</p>;
  }
}

function DescTaxBracket(props: {
  bracket: { lower: number; upper?: number; rate: number }[];
}) {
  return (
    <Table>
      <TableBody>
        {props.bracket.map((b) => (
          <TableRow>
            <TableCell>{formatNZD(b.lower)}</TableCell>
            <TableCell>
              {b.upper !== undefined ? formatNZD(b.upper) : "∞"}
            </TableCell>
            <TableCell>{`%${(b.rate * 100).toFixed(2)}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ppBillions(x: number) {
  return (x / 1e9).toFixed(1) + "B";
}
