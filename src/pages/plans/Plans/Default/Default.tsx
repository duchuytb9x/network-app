// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Spinner, Typography } from '@subql/react-ui';
import * as React from 'react';
import { usePlans, useWeb3 } from '../../../../containers';
import { mapAsync, notEmpty, renderAsyncArray } from '../../../../utils';
import { useTranslation } from 'react-i18next';
import List from '../List';

const Default: React.VFC = () => {
  const { account } = useWeb3();
  const { t } = useTranslation();
  const plans = usePlans({ address: account ?? '' });

  return (
    <div className={'contentContainer'}>
      <Typography variant="h6">{t('plans.default.title')}</Typography>
      <div className={'content'}>
        {renderAsyncArray(
          mapAsync((d) => d.plans?.nodes.filter(notEmpty), plans),
          {
            loading: () => <Spinner />,
            error: (e) => <Typography>{`Error loading plans: ${e}`}</Typography>,
            empty: () => <Typography>{t('plans.default.nonPlans')}</Typography>,
            data: (data) => <List data={data} onRefresh={plans.refetch} />,
          },
        )}
      </div>
    </div>
  );
};

export default Default;