// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

const en = {
  translation: {
    header: {
      explorer: 'Explorer',
      studio: 'Studio',
      staking: 'Stake & Delegate',
      documentation: 'Documentation',
      github: 'Github',
      connectWallet: 'Connect',
      hosted: 'Hosted Service',
    },
    footer: {
      title: 'Join The Future',
      copyright: 'SubQuery © ',
    },
    projectCard: {
      noDescription: 'No description',
    },
    studio: {
      create: {
        name: 'Name',
        image: 'Upload Logo',
        subtitle: 'Subtitle',
        description: 'Description',
        websiteUrl: 'Website URL',
        codeUrl: 'Code URL',
      },
      project: {
        tab1: 'Details',
        tab2: 'Deployments',
      },
    },
    explorer: {
      project: {
        tab1: 'Overview',
        tab2: 'Indexers',
        tab3: 'Playground',
      },
      home: {
        header: 'SubQuery projects',
      },
    },
    deployment: {
      create: {
        title: 'Create New Deployment',
        version: 'Version',
        description: 'Description',
        deploymentId: 'Deployment ID',
        explainer: 'You can get a deployment id by running `subqul publish` from the command line',
        submit: 'Deploy New Version',
      },
    },
    noIndexers: {
      preTitle: 'no indexers available',
      title: 'Start indexing this project',
      subtitle: 'Learn how to index a SubQuery <1>here</1>',
    },
    indexers: {
      head: {
        indexers: 'Indexers',
        progress: 'Progress',
        status: 'Status',
        url: 'Query URL',
      },
    },
    create: {
      title: 'Create your first SubQuery project',
      subtitle: 'Learn how to create a SubQuery project <1>here</1>.',
      button: 'Create a project',
      step1: {
        name: 'Step 1',
        title: 'Create',
        subtitle: 'Give your SubQuery project a name.',
      },
      step2: {
        name: 'Step 2',
        title: 'Install',
        subtitle: 'Install the SubQuery CLI.',
      },
      step3: {
        name: 'Step 3',
        title: 'Define & Deploy',
        subtitle: 'Define and deploy your SubQuery project in the CLI.',
      },
      step4: {
        name: 'Step 4',
        title: 'Publish',
        subtitle:
          'Fill out metadata and deployment details, then when you are ready, publish your SubQuery project to the Explorer.',
      },
    },
    edit: {
      submitButton: 'Save',
      cancelButton: 'Cancel',
    },
    createInsturctions: {
      button: 'View Documentation',
      title1: 'Install Subql CLI',
      content1_1: 'The @subql/cli (opens new window)tool helps to create define and deploy a subquery project.',
      content1_2: 'Install SubQuery CLI globally on your terminal by using NPM:',
      title2: 'Deployment Version',
      content2: 'A semver for the deployment. e.g. 1.0.0',
      title3: 'Deployment ID',
      content3: 'The deployment id, this can be acquired by running <1>subql publish</1> with the CLI',
      installCommand: 'npm i -g @subql/cli',
    },
    newProjectModal: {
      title: 'Create a SubQuery project',
      subtitle: `Project name doesn't need to be unique and you can change the project name later.`,
      button: 'Continue',
      placeholder: 'Project Name',
    },
    projectOverview: {
      createdAt: 'Created',
      updatedAt: 'Last Updated',
      deploymentDescription: 'Deployment Description',
    },
    projectDetail: {
      description: 'Description',
      websiteUrl: 'Website URL',
      sourceUrl: 'Source Code URL',
      button: 'Edit',
    },
    projectHeader: {
      id: 'Project ID',
      deploymentId: 'Deployment ID',
    },
    connectWallet: {
      title: 'Connect wallet to use the studio',
      subtitle:
        'Use the studio to create and manage your SubQuery projects.<br/>Learn how to create a SubQuery project <1>here</1>.',
      connectWith: 'Connect With:',
      metamaskDesc: 'Connect with Metamask browser extension',
    },
    unsupportedNetwork: {
      title: 'Unsupported network',
      subtitle: 'Please switch networks to use the Studio',
      button: 'Switch Network',
    },
    indexerProgress: {
      blocks_one: '1 block behind',
      blocks_other: '{{count}} blocks behind',
    },
    deployments: {
      header1: 'Version',
      header2: 'Deployment ID',
      header3: 'Description',
      header4: 'Created',
    },
    errors: {
      transactionRejected: 'User rejected the request',
    },
    indexer: {
      title: 'indexer',
      profile: 'My profile',
      currentEra: 'Current Era',
      indexing: 'Indexing',
      totalStakeAmount: 'Total Stake amount',
      rewards: 'Rewards',
      locked: 'Locked',
      totalStake: 'total stake',
      ownStake: 'own stake',
      commission: 'commission',
      delegated: 'delegated',
      capacity: 'capacity',
      stake: 'Stake',
      unstake: 'Unstake',
      enterStakeAmount: 'Enter Staking Amount',
      confirmOnMetamask: 'Confirm On MetaMask',
      stakeValidNextEra: 'Once confirm, your tokens will be staked from next era.',
      stakeInputTitle: 'Enter the amount of SQT you want to stake',
      confirmStake: 'Confirm Stake',
      enterUnstakeAmount: 'Enter Unstake Amount',
      unstakeValidNextEra:
        'Tokens will be unstaked from next era. They will then be locked for 28 days before you can withdraw. During this period, tokens do not earn any rewards.',
      unstakeInputTitle: 'Enter the amount of SQT you want to unstake',
      confirmUnstake: 'Confirm Unstake',
      updateCommissionRate: 'Change commission rate',
      setNewCommissionRate: 'Set new commission rate',
      newRateValidNext2Era: 'Once confirm, the new rate will take 2 full eras to be effective.',
      enterCommissionRate: 'Enter the commission rate',
      currentRate: 'Current rate',
      confirmRate: 'Confirm Rate',
      action: 'action',
      approveToken: 'Approval',
      approveTokenToStake: 'Approve your token for staking',
      confirmApproval: 'Confirm Approval',
      notRegister: 'You haven’t registered as an indexer yet.',
      doStake: 'You haven’t staked yet. Stake to become an indexer.',
      learnMore: 'Learn how to become an indexer',
      topRowData: 'Top row of the data represents the data in current era.',
      secondRowData: 'Data displayed after means the data that will take into effect from next era.',
      here: 'here',
    },

    delegate: {
      title: 'Delegate',
      delegating: 'Delegating',
      youHave: '`You have total',
      delegators: 'delegator(s)',
      totalDelegation: 'Total Delegation to indexer(s)',
      delegator: 'Delegator',
      currentEra: 'Current Era',
      nextEra: 'Next Era',
      undelegate: 'Undelegate',
      enterAmount: 'Enter Amount',
      delegateValidNextEra: 'Once confirm, your tokens will be delegated from next era.',
      delegateAmount: 'Enter the amount of SQT you want to delegate',
      confirmDelegate: 'Confirm Delegation',
      undelegateValidNextEra:
        'Tokens will be undelegated from next era. They will then be locked for 28 days before you can withdraw. During this period, tokens do not earn any rewards. ',
      undelegateAmount: 'Enter the amount of SQT you want to undelegate',
      confirmUndelegate: 'Confirm Undelegation',
      approveTokenToDelegate: 'Approve your token for staking',
      noDelegating: 'No delegation available',
      yourDelegateAmount: 'Your Delegation Amount',
    },

    withdrawals: {
      youCanWithdraw: 'You can withdraw total of ',
      from: 'from',
      unlockedAssets: 'unlocked asset(s)',
      amount: 'amount',
      start: 'start at',
      status: 'status',
      claimed: 'Claimed',
      unClaim: 'UnClaim',
      noWithdrawals: 'No withdrawals available.',
      withdrawToken: 'Withdraw all unlocked assets',
      withdraw: 'Withdraw',
      enterAmount: 'Enter Amount',
      enterWithdrawAmount: 'Enter the amount of SQT you want to withdraw',
      confirmWithdraw: 'Confirm Withdraw',
    },

    general: {
      current: 'current',
      next: 'next',
    },
  },
};

export type Translations = typeof en;

export default en;
