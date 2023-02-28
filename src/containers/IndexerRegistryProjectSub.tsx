// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { gql } from '@apollo/client';

export const SUB_INDEXERS = gql`
  subscription GetIndexers {
    indexers {
      id
      _entity
    }
  }
`;

export const SUB_DELEGATIONS = gql`
  subscription GetDelegations {
    delegations {
      id
      _entity
    }
  }
`;

export const SUB_DELEGATORS = gql`
  subscription GetDelegators {
    delegators {
      id
      _entity
    }
  }
`;

export const SUB_PLAN_TEMPLATES = gql`
  subscription GetPlanTemplates {
    planTemplates {
      id
      _entity
    }
  }
`;