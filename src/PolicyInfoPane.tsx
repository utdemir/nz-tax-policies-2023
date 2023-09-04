import { Policy } from "./policies/policy";

export function PolicyInfoPane(props: { policy: Policy<any> }) {
  return (
    <>
      <h2>{props.policy.name}</h2>
      <p>{props.policy.description}</p>
      <p>Total Profit: {ppBillions(props.policy.nationwideTax())}</p>
    </>
  );
}

function ppBillions(x: number) {
  return (x / 1e9).toFixed(1) + "B";
}
