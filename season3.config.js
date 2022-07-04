// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

require('dotenv').config();

module.exports = {
    client: {
        service: {
            name: 'registry',
            url: process.env.REACT_APP_SEASON_3,
        },
        tagName: "gql",
        excludes: [
            'src/hooks/useApiEndpoint.ts',
            'src/containers/IndexerRegistryProject.tsx',
            'src/containers/QueryRegistryProject.tsx',
            'src/containers/QueryLeaderboardProject.tsx',
            'src/containers/QuerySeason2Project.tsx',
        ]
    }
};