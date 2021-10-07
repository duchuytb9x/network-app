// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { useIPFS, useProjectMetadata } from '../../containers';
import { useTranslation } from 'react-i18next';
import { ProjectMetadata, projectMetadataSchema } from '../../models';
import { ImageInput } from '../../components';

const Create: React.VFC = () => {
  const { t } = useTranslation('translation');

  const { uploadMetadata } = useProjectMetadata();
  const { ipfs } = useIPFS();

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          subtitle: '',
          description: '',
          websiteUrl: undefined,
          image: undefined,
        }}
        validationSchema={projectMetadataSchema.shape({})}
        onSubmit={async (values: ProjectMetadata) => {
          // Form can give us a File type that doesn't match the schema
          if ((values.image as unknown) instanceof File) {
            const res = await ipfs.add(values.image as unknown as File);
            values.image = res.cid.toString();
          }

          const cid = await uploadMetadata(values);

          console.log('Uploaded metadata to IPFS', cid);
          /* TODO make contract call updating metadata on project */
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <label htmlFor="name">{t('studio.create.name')}</label>
            <Field name="name" />
            {errors.name && touched.name && <div>{errors.name}</div>}
            <ImageInput
              label={t('studio.create.image')}
              value={values.image}
              onChange={(value) => setFieldValue('image', value)}
            />
            <label htmlFor="subtitle">{t('studio.create.subtitle')}</label>
            <Field name="subtitle" />
            <label htmlFor="description">{t('studio.create.description')}</label>
            <Field name="description" as="textarea" />
            <label htmlFor="websiteUrl">{t('studio.create.websiteUrl')}</label>
            <Field name="websiteUrl" />
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;