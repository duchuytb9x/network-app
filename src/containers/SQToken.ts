// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useAsyncMemoWithLazy } from '@hooks/useAsyncMemo';
import { limitContract } from '@utils/limitation';
import assert from 'assert';
import { useAccount } from 'wagmi';

import { useWeb3Store } from 'src/stores';

import { createContainer } from './Container';

function useSQTokenImpl() {
  const { address: account } = useAccount();
  const { contracts, rootContracts } = useWeb3Store();
  const balance = useAsyncMemoWithLazy(async () => {
    assert(contracts, 'Contracts not available');
    assert(account, 'Account not available');

    return limitContract(() => contracts.sqToken.balanceOf(account));
  }, [account, contracts]);

  const ethSqtBalance = useAsyncMemoWithLazy(async () => {
    assert(rootContracts, 'Contracts not available');
    assert(account, 'Account not available');

    return limitContract(() => rootContracts.sqToken.balanceOf(account));
  }, [account, rootContracts]);

  const consumerHostBalance = useAsyncMemoWithLazy(async () => {
    assert(contracts, 'Contracts not available');
    assert(account, 'Account not available');

    return contracts.consumerHost.consumers(account);
  }, [account, contracts]);

  const consumerHostAllowance = useAsyncMemoWithLazy(async () => {
    assert(contracts, 'Contracts not available');
    assert(account, 'Account not available');

    return contracts.sqToken.allowance(account, contracts.consumerHost.address);
  }, [account, contracts]);

  const stakingAllowance = useAsyncMemoWithLazy(async () => {
    assert(contracts, 'Contracts not available');
    assert(account, 'Account not available');

    return contracts.sqToken.allowance(account, contracts.staking.address);
  }, [account, contracts]);

  const planAllowance = useAsyncMemoWithLazy(async () => {
    assert(contracts, 'Contracts not available');
    assert(account, 'Account not available');

    return contracts.sqToken.allowance(account, contracts.planManager.address);
  }, [account, contracts]);

  const offerAllowance = useAsyncMemoWithLazy(async () => {
    assert(contracts, 'Contracts not available');
    assert(account, 'Account not available');

    return contracts.sqToken.allowance(account, contracts.purchaseOfferMarket.address);
  }, [account, contracts]);

  const permissionExchangeAllowance = useAsyncMemoWithLazy(async () => {
    assert(contracts, 'Contracts not available');
    assert(account, 'Account not available');
    return limitContract(
      async () => await contracts.sqToken.allowance(account, contracts.permissionedExchange.address),
    );
  }, [account, contracts]);

  return {
    balance,
    ethSqtBalance,
    consumerHostBalance,
    stakingAllowance,
    planAllowance,
    offerAllowance,
    permissionExchangeAllowance,
    consumerHostAllowance,
  };
}

export const { useContainer: useSQToken, Provider: SQTokenProvider } = createContainer(useSQTokenImpl, {
  displayName: 'SQToken',
});
