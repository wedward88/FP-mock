export type CardData = {
  number: string;
  name: string;
  expirMonth: string;
  expirYear: string;
  cvv: string;
  amount: string;
};

// Everything from CardData, plus an ID
// from the database
export type Transaction = {
  id: string;
} & CardData;
