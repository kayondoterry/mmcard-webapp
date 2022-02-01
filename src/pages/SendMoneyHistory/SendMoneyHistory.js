import TransactionList from "./components/TransactionList";

function SendMoneyHistory() {
  const transactions = getTransactions();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-700 text-center my-4">Latest Transactions for +256786852458</h1>
      <TransactionList transactions={transactions} />
    </div>
  );
}

function getTransactions() {
  return [
    {
      id: "7c3e9bad-963f-4226-b979-0299b6d43407",
      amount: 25000,
      receiverName: "Nabilibikondde Goretti",
      date: "",
      serviceFee: 750,
      senderNumber: "+256786852458",
      reference: "66570fce-e619-4d29-9746-610870e4b452",
      status: "pending"
    },
    {
      id: "b15b7068-f7ec-4f11-af0d-ef7e815366a1",
      amount: 97000,
      receiverName: "Abdul Henry",
      date: "",
      serviceFee: 2910,
      senderNumber: "+256786852458",
      reference: "dcfec8d9-20db-4c76-93e1-3f6caa0afa23",
      status:"success"
    },
    // {
    //   id: "6c370900-6b0a-4933-9fae-9ed63ba8106c",
    //   amount: "",
    //   receiverName: "",
    //   date: "",
    //   serviceFee: "",
    //   senderNumber: "",
    //   reference: "dc9c23f6-cd11-42a8-9e4f-a7c328cbf497",
    // },
    // {
    //   id: "c7464a73-3c8b-4267-a9ff-fb2d75053918",
    //   amount: "",
    //   receiverName: "",
    //   date: "",
    //   serviceFee: "",
    //   senderNumber: "",
    //   reference: "33190810-3f8c-4987-bfcd-048780de9268",
    // },
    // {
    //   id: "fd9cb63b-5bfb-4d0e-8201-7f26ae10fe8b",
    //   amount: "",
    //   receiverName: "",
    //   date: "",
    //   serviceFee: "",
    //   senderNumber: "",
    //   reference: "96c0ba8f-1e77-4232-aa97-c345afb4eea0",
    // },
    // {
    //   id: "307c8d3d-c7a6-4a1e-b7d1-df343cfca990",
    //   amount: "",
    //   receiverName: "",
    //   date: "",
    //   serviceFee: "",
    //   senderNumber: "",
    //   reference: "79174c7a-148e-442c-83ad-e3f2d302aff9",
    // },
    // {
    //   id: "5098a704-700c-4fee-97fe-60e5d432c8be",
    //   amount: "",
    //   receiverName: "",
    //   date: "",
    //   serviceFee: "",
    //   senderNumber: "",
    //   reference: "24e0311e-2e11-4cb6-83ab-21afee2ca17f",
    // },
  ];
}

export default SendMoneyHistory;
