import { Transaction } from '../types/types';

interface TransactionIds {
  transactionIds: Transaction[];
}

const TransactionList = ({ transactionIds }: TransactionIds) => {
  console.log(transactionIds[0]);
  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactionIds.map((transaction) => (
          <li key={transaction.id}>
            <a
              href={`/api/transaction?transactionId=${transaction.id}`}
            >
              {transaction.id}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
