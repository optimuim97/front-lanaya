// useFormatAmount.js
import { ref } from 'vue';

export function useFormatAmount() {
  const formattedAmount = ref('');

  const formatAmount = (amount, locale = 'en-US', currency = 'USD') => {
    if (isNaN(amount)) {
      formattedAmount.value = 'Invalid amount';
      return;
    }

    formattedAmount.value = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return {
    formattedAmount,
    formatAmount
  };
}
