// Format currency in Indian Rupees
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Format number with Indian numbering system
export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
};

// Parse currency string to number
export const parseCurrency = (currencyStr: string): number => {
    return parseFloat(currencyStr.replace(/[^0-9.-]+/g, ''));
};
