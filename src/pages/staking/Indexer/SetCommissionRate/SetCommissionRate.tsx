// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import assert from 'assert';
import { useTranslation } from 'react-i18next';
import { useContracts, useWeb3 } from '../../../../containers';
import TransactionModal from '../../../../components/TransactionModal';
import { useIsIndexer } from '../../../../hooks';

export const SetCommissionRate: React.VFC = () => {
  const pendingContracts = useContracts();
  const { t } = useTranslation();
  const { account } = useWeb3();
  const isIndexer = useIsIndexer(account);

  // TODO:useCommission
  // const curAmount = 10;
  const modalText = {
    title: t('indexer.updateCommissionRate'),
    steps: [t('indexer.setNewCommissionRate'), t('indexer.confirmOnMetamask')],
    description: t('indexer.newRateValidNext2Era'),
    inputTitle: t('indexer.enterCommissionRate'),
    submitText: t('indexer.confirmRate'),
    failureText: `Sorry, the commission update operation has failed.`,
  };

  const handleClick = async (amount: string) => {
    const contracts = await pendingContracts;
    assert(contracts, 'Contracts not available');
    return contracts.staking.setCommissionRate(Math.floor(parseInt(amount, 10) * 10));
  };

  if (!isIndexer.data) return null;

  return (
    <TransactionModal
      text={modalText}
      actions={[
        {
          label: t('indexer.updateCommissionRate'),
          key: 'commission',
        },
      ]}
      inputParams={{
        max: 100,
        min: 0,
        unit: '%',
      }}
      onClick={handleClick}
    />
  );
};
