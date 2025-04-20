export type CardData = {
  number: string;
  name: string;
  expirMonth: string;
  expirYear: string;
  cvv: string;
  amount: string;
};

export type Transaction = {
  id: string;
} & CardData;
