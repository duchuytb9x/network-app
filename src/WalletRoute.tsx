// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Toast } from '@subql/react-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route } from 'react-router';
import { ConnectWallet } from './components';
import { useWeb3 } from './containers';
import { injectedConntector } from './containers/Web3';
import styles from './WalletRoute.module.css';

export const WalletRoute: React.FC<React.ComponentProps<typeof Route> & { title?: string; subtitle?: string }> = ({
  title,
  subtitle,
  ...rest
}) => {
  const { account, activate, error } = useWeb3();
  const { t } = useTranslation();

  const [errorAlert, setErrorAlert] = React.useState<string>();

  React.useEffect(() => {
    if (error) {
      setErrorAlert(error.message || 'Failed to connect wallet.');
    }
  }, [error]);

  const handleConnectWallet = React.useCallback(async () => {
    if (account) return;

    try {
      await activate(injectedConntector);
    } catch (e) {
      setErrorAlert((e as Error).message);
      console.log('Failed to activate wallet', e);
    }
  }, [activate, account]);

  if (!account) {
    return (
      <div className={styles.container}>
        {errorAlert && <Toast state="error" text={errorAlert} className={styles.error} />}
        <ConnectWallet onConnect={handleConnectWallet} title={title} subTitle={subtitle} />
      </div>
    );
  }

  return <Route {...rest} />;
};