export const CreateMerchantRespnoseExample = {
  id: 12,
  name: 'Nike',
  isBezosRelated: false,
};

export const CreateBezosMerchantRespnoseExample = {
  id: 13,
  name: 'AWS',
  isBezosRelated: true,
};

export const CreateMerchantDuplicateErrorExample = {
  statusCode: 409,
  message: 'Duplicate entry for name',
};

export const MerchantListResponseExample = [
  CreateMerchantRespnoseExample,
  CreateBezosMerchantRespnoseExample,
];

export const UpdateMerchantNameResponseExample = {
  id: 12,
  name: 'Addidas',
  isBezosRelated: false,
};

export const MarkMerchantAsBezosRelatedResponseExample = {
  id: 12,
  name: 'Addidas',
  isBezosRelated: true,
};
