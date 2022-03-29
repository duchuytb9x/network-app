// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import {
  GetDeploymentPlans_plans_nodes as Plan,
  GetDeploymentPlans_plans_nodes_planTemplate as PlanTemplate,
} from '../../__generated__/GetDeploymentPlans';
import { Table, TableProps } from 'antd';
import { LazyQueryResult } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { BigNumber } from '@ethersproject/bignumber';
import { AsyncData, formatEther, renderAsync, renderAsyncArray } from '../../utils';
import { Button, Spinner, Typography } from '@subql/react-ui';
import TransactionModal from '../TransactionModal';
import { ContractTransaction } from '@ethersproject/contracts';
import { IndexerDetails } from '../../models';
import IndexerName from './IndexerName';
import { ApproveContract, ModalApproveToken, tokenApprovalModalText } from '../ModalApproveToken';

export type PlansTableProps = {
  loadPlans: () => void;
  asyncPlans: LazyQueryResult<Plan[], unknown>;
} & Omit<DoPurchaseProps, 'plan'>;

type DoPurchaseProps = {
  plan: Plan;
  indexerDetails?: IndexerDetails;
  purchasePlan: (indexer: string, planId: string) => Promise<ContractTransaction>;
  balance: AsyncData<BigNumber>;
  planManagerAllowance: AsyncData<BigNumber> & { refetch: () => void };
  deploymentId?: string;
};

const DoPurchase: React.VFC<DoPurchaseProps> = ({
  plan,
  purchasePlan,
  balance,
  planManagerAllowance,
  indexerDetails,
  deploymentId,
}) => {
  const { t } = useTranslation();

  const requiresTokenApproval = planManagerAllowance.data?.isZero();

  const modalText = requiresTokenApproval
    ? tokenApprovalModalText
    : {
        title: t('plans.purchase.title'),
        steps: [t('plans.purchase.step1'), t('indexer.confirmOnMetamask')],
        description: t('plans.purchase.description'),
        submitText: '',
        inputTitle: '',
        failureText: t('plans.purchase.failureText'),
      };

  return (
    <TransactionModal
      variant="textBtn"
      actions={[{ label: t('plans.purchase.action'), key: 'purchase' }]}
      text={modalText}
      onClick={() => purchasePlan(plan.creator, plan.id)}
      renderContent={(onSubmit, onCancel, isLoading) => {
        return renderAsync(planManagerAllowance, {
          loading: () => <Spinner />,
          error: (e) => <Typography>{`Failed to check if token needs approval: ${e.message}`}</Typography>,
          data: () => {
            if (requiresTokenApproval) {
              return (
                <ModalApproveToken
                  contract={ApproveContract.PlanManager}
                  onSubmit={() => planManagerAllowance.refetch()}
                />
              );
            }
            return (
              <div>
                <div>
                  <Typography>{t('indexer.title')}</Typography>
                  <IndexerName name={indexerDetails?.name} image={indexerDetails?.image} address={plan.creator} />
                </div>
                <Typography>{`${t('plans.headers.price')}: ${formatEther(BigNumber.from(plan.price))} SQT`}</Typography>
                <Typography>{`${t('plans.headers.period')}: ${plan.planTemplate?.period} days`}</Typography>
                <Typography>{`${t('plans.headers.dailyReqCap')}: ${
                  plan.planTemplate?.dailyReqCap
                } queries`}</Typography>
                <Typography>{`${t('plans.headers.rateLimit')}: ${
                  plan.planTemplate?.rateLimit
                } queries/min`}</Typography>
                <Typography>{`${t('plans.headers.deploymentId')}: ${deploymentId}`}</Typography>

                <div>
                  <Typography>{t('plans.purchase.yourBalance')}</Typography>
                  {renderAsync(balance, {
                    loading: () => <Spinner />,
                    error: () => <Typography>{t('plans.purchase.failToLoadBalance')}</Typography>,
                    data: (data) => <Typography>{`${formatEther(BigNumber.from(plan.price))} SQT`}</Typography>,
                  })}
                </div>

                <Button
                  label={t('plans.purchase.cancel')}
                  onClick={onCancel}
                  disabled={isLoading}
                  type="secondary"
                  colorScheme="neutral"
                />
                <Button
                  label={t('plans.purchase.submit')}
                  onClick={() => onSubmit({})}
                  loading={isLoading}
                  colorScheme="standard"
                />
              </div>
            );
          },
        });
      }}
    />
  );
};

const PlansTable: React.VFC<PlansTableProps> = ({ loadPlans, asyncPlans, planManagerAllowance, ...rest }) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!asyncPlans.called) loadPlans();
  }, [loadPlans, asyncPlans]);

  React.useEffect(() => {
    if (planManagerAllowance.error) {
      planManagerAllowance.refetch();
    }
  }, []);

  const columns: TableProps<Plan>['columns'] = [
    {
      dataIndex: 'id',
      title: t('plans.headers.id'),
      width: 30,
      render: (text: string) => <Typography>{text}</Typography>,
    },
    {
      dataIndex: 'price',
      key: 'price',
      title: t('plans.headers.price'),
      render: (value: BigInt) => <Typography>{`${formatEther(BigNumber.from(value))} SQT`}</Typography>,
    },
    {
      dataIndex: 'planTemplate',
      key: 'period',
      title: t('plans.headers.period'),
      render: (value: PlanTemplate) => <Typography>{`${BigNumber.from(value.period).toNumber()} Days`}</Typography>,
    },
    {
      dataIndex: 'planTemplate',
      key: 'dailyReqCap',
      title: t('plans.headers.dailyReqCap'),
      render: (value: PlanTemplate) => <Typography>{`${BigNumber.from(value.dailyReqCap).toNumber()}`}</Typography>,
    },
    {
      dataIndex: 'planTemplate',
      key: 'rateLimit',
      title: t('plans.headers.rateLimit'),
      render: (value: PlanTemplate) => <Typography>{`${BigNumber.from(value.rateLimit).toNumber()}`}</Typography>,
    },
    {
      dataIndex: 'id',
      key: 'action',
      title: t('plans.headers.action'),
      width: 30,
      render: (id: string, plan: Plan) => {
        return <DoPurchase {...rest} plan={plan} planManagerAllowance={planManagerAllowance} />;
      },
    },
  ];

  return renderAsyncArray(asyncPlans, {
    loading: () => <Spinner />,
    error: () => <Typography>Failed to get plans for indexer</Typography>,
    empty: () => <Typography>This indexer has no plans</Typography>,
    data: (data) => <Table columns={columns} dataSource={data} />,
  });
};

export default PlansTable;
