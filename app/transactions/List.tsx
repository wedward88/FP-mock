import { Transaction } from '../types/types';

interface TransactionIds {
  transactionIds: Transaction[];
}

const TransactionList = ({ transactionIds }: TransactionIds) => {
  return (
    <div>
      <h2 className="text-xl mb-5">Transaction List</h2>
      <ul className="flex flex-col h-full space-y-2">
        {transactionIds.map((transaction) => (
          <li
            key={transaction.id}
            className="p-2 cursor-pointer border-1 border-gray-300 rounded-xl text-gray-500 hover:text-black"
          >
            <a href={`/transactions/${transaction.id}`}>
              {transaction.id}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
