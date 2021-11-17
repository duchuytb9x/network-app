// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NewDeployment, ProjectMetadata, projectMetadataSchema } from '../models';
import { createContainer } from './Container';
import { useIPFS } from './IPFS';

function useProjectMetadataImpl() {
  const { ipfs, catSingle } = useIPFS();

  const getMetadataForProject = async (projectId: string): Promise<ProjectMetadata> => {
    // Load ipfs metadata cid from blockchain
    throw new Error('Not implemented');
  };

  const getMetadataFromCid = async (cid: string): Promise<ProjectMetadata> => {
    const result = await catSingle(cid);
    const rawMeta = JSON.parse(Buffer.from(result).toString('utf8'));
    return projectMetadataSchema.validate(rawMeta);
  };

  const uploadMetadata = async (meta: ProjectMetadata): Promise<string> => {
    await projectMetadataSchema.validate(meta);

    if (meta.image) {
      // TODO validate image is ipfs link
    }

    const result = await ipfs.add(Buffer.from(JSON.stringify(meta)), { pin: true });

    return result.cid.toV0().toString();
  };

  const uploadVersionMetadata = async (version: Omit<NewDeployment, 'deploymentId'>): Promise<string> => {
    const result = await ipfs.add(JSON.stringify(version), { pin: true });

    return result.cid.toV0().toString();
  };

  const getVersionMetadata = async (cid: string): Promise<Omit<NewDeployment, 'deploymentId'>> => {
    const raw = await catSingle(cid);

    return JSON.parse(Buffer.from(raw).toString('utf8'));
  };

  return {
    getMetadataForProject,
    getMetadataFromCid,
    getVersionMetadata,
    uploadMetadata,
    uploadVersionMetadata,
  };
}

export const { useContainer: useProjectMetadata, Provider: ProjectMetadataProvider } = createContainer<
  ReturnType<typeof useProjectMetadataImpl>,
  never
>(useProjectMetadataImpl, { displayName: 'ProjectMetadata' });
