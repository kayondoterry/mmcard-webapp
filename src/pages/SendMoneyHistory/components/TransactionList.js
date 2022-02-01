import TransactionItem from "./TransactionItem";

function TransactionList({ transactions }) {
  return (
    <div className="p-4">
      
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionList;
