import clsx from 'clsx';
import {
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
} from 'react-icons/fa';
import { FaCcAmex } from 'react-icons/fa6';

import { CardData, Transaction } from '../types/types';
import { getCardType } from '../utils';

interface CardTypeProps {
  cardDetails: Transaction | CardData;
}

const CardType = ({ cardDetails }: CardTypeProps) => {
  let cardType = 'Unknown';
  if (cardDetails.number) {
    cardType = getCardType(cardDetails.number);
  }
  return (
    <div className="flex gap-2 ml-2">
      <FaCcVisa
        className={clsx(
          'text-2xl',
          cardType === 'Visa' ? 'opacity-100' : 'opacity-30'
        )}
      />
      <FaCcMastercard
        className={clsx(
          'text-2xl',
          cardType === 'MasterCard' ? 'opacity-100' : 'opacity-30'
        )}
      />
      <FaCcAmex
        className={clsx(
          'text-2xl',
          cardType === 'American Express'
            ? 'opacity-100'
            : 'opacity-30'
        )}
      />
      <FaCcDiscover
        className={clsx(
          'text-2xl',
          cardType === 'Discover' ? 'opacity-100' : 'opacity-30'
        )}
      />
    </div>
  );
};

export default CardType;
