// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FormProjectMetadata, projectMetadataSchema, ProjectWithMetadata } from '../../models';
import Button from '../Button';
import ImageInput from '../ImageInput';
import styles from './ProjectEdit.module.css';

type Props = {
  project: Required<ProjectWithMetadata>;
  onSubmit: (metadata: FormProjectMetadata) => void | Promise<void>;
};

const ProjectEdit: React.VFC<Props> = (props) => {
  const { t } = useTranslation('translation');

  const handleSubmit = async (metadata: FormProjectMetadata) => {
    await props.onSubmit(metadata);
  };

  return (
    <div>
      <Formik
        initialValues={props.project.metadata}
        validationSchema={projectMetadataSchema.shape({})}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting, submitForm, setFieldValue, touched, values }) => (
          <Form>
            <div className={styles.form}>
              <label htmlFor="name">{t('studio.create.name')}</label>
              <Field name="name" />
              {errors.name && touched.name && <div>{errors.name}</div>}
              <ImageInput
                label={t('studio.create.image')}
                value={values.image}
                onChange={(value) => setFieldValue('image', value)}
              />
              <label htmlFor="description">{t('studio.create.description')}</label>
              <Field name="description" as="textarea" />
              <label htmlFor="websiteUrl">{t('studio.create.websiteUrl')}</label>
              <Field name="websiteUrl" />
              <label htmlFor="codeUrl">{t('studio.create.codeUrl')}</label>
              <Field name="codeUrl" />
              {<p>{JSON.stringify(errors)}</p>}
              <div /*className={styles.submit}*/>
                <Button onClick={submitForm} type="primary" label="Save" disabled={isSubmitting} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectEdit;