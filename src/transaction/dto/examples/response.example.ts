export const DownloadedTransactionsResponseExample = [
  {
    id: 0,
    amount: 50.42,
    date: '2029-01-01T00:00:00.000Z',
    merchantId: 1,
  },
  {
    id: 1,
    amount: 19.43,
    date: '2029-01-03T00:00:00.000Z',
    merchantId: 2,
  },
  {
    id: 2,
    amount: 0.35,
    date: '2029-01-05T00:00:00.000Z',
    merchantId: 3,
  },
  {
    id: 3,
    amount: 3.17,
    date: '2029-01-05T00:00:00.000Z',
    merchantId: 4,
  },
];

export const TransactionListResponseExample = {
  transactions: [
    {
      id: 37,
      amount: 10.72,
      date: '2029-01-31T00:00:00.000Z',
      merchantId: 4,
      merchant: {
        name: 'Lyft',
        isBezosRelated: true,
      },
    },
    {
      id: 36,
      amount: 50.49,
      date: '2029-01-31T00:00:00.000Z',
      merchantId: 9,
      merchant: {
        name: 'Cascal',
        isBezosRelated: false,
      },
    },
    {
      id: 34,
      amount: 68.92,
      date: '2029-01-28T00:00:00.000Z',
      merchantId: 11,
      merchant: {
        name: '24 Hour Fitness',
        isBezosRelated: false,
      },
    },
    {
      id: 35,
      amount: 68.92,
      date: '2029-01-28T00:00:00.000Z',
      merchantId: 11,
      merchant: {
        name: '24 Hour Fitness',
        isBezosRelated: true,
      },
    },
  ],
  totalAmount: '3256.15',
  percentageOfTotalSpend: '100.0',
  count: 28,
};

export const BezosTransactionListResponseExample = {
  transactions: [
    {
      id: 37,
      amount: 10.72,
      date: '2029-01-31T00:00:00.000Z',
      merchantId: 4,
      merchant: {
        name: 'Lyft',
        isBezosRelated: true,
      },
    },
    {
      id: 36,
      amount: 50.49,
      date: '2029-01-31T00:00:00.000Z',
      merchantId: 9,
      merchant: {
        name: 'Cascal',
        isBezosRelated: true,
      },
    },
    {
      id: 34,
      amount: 68.92,
      date: '2029-01-28T00:00:00.000Z',
      merchantId: 11,
      merchant: {
        name: '24 Hour Fitness',
        isBezosRelated: true,
      },
    },
    {
      id: 35,
      amount: 68.92,
      date: '2029-01-28T00:00:00.000Z',
      merchantId: 11,
      merchant: {
        name: '24 Hour Fitness',
        isBezosRelated: true,
      },
    },
  ],
  totalAmount: '3256.15',
  percentageOfTotalSpend: '100.0',
  count: 28,
};

export const BadQueryRequestExample = {
  statusCode: 400,
  message: ['year is required because month is set'],
  error: 'Bad Request',
};

export const TransactionResponseExample = {
  id: 1,
  amount: 19.43,
  date: '2029-01-03T00:00:00.000Z',
  merchantId: 2,
  merchant: {
    name: 'Whole Foods',
    isBezosRelated: true,
  },
};

export const RetrieveTransactionError = {
  statusCode: 404,
  message: 'Unique identifier not found',
};
