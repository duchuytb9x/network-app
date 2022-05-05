// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Button } from 'antd';
import { Typography } from '@subql/react-ui';
import { useFormik } from 'formik';
import styles from './ModalInput.module.css';
import { parseError } from '../../utils/parseError';
import { NumberInput } from '../NumberInput';

/**
 * NOTE:
 * Using antd: Input/Button
 * Waiting for SubQuery components lib(also based on antD) release and replace
 */

// TODO: percentage input
// TODO: input validation

interface Props {
  inputTitle?: string;
  submitText?: string;
  curAmount?: number;
  showMaxButton?: boolean;
  inputBottomText?: string;
  failureModalText?: string;
  unit?: string;
  isLoading?: boolean;
  max?: number;
  min?: number;
  onSubmit: (value: any) => void;
  onError?: () => void;
}

export const ModalInput: React.FC<Props> = ({
  inputTitle,
  submitText,
  onSubmit,
  onError,
  unit = 'SQT',
  isLoading,
  curAmount,
  showMaxButton,
  inputBottomText,
  failureModalText,
  min,
  max,
}) => {
  const maxInputNumber = curAmount || max;
  const formik = useFormik({
    initialValues: {
      input: 0,
    },
    // TODO:validate,
    onSubmit: async (values, { resetForm, setErrors }) => {
      const { input } = values;
      try {
        await onSubmit(input);
        resetForm();
      } catch (error: any) {
        setErrors({ input: parseError(error) });
        onError && onError();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <NumberInput
        title={inputTitle}
        unit={unit}
        inputParams={{
          name: 'input',
          id: 'input',
          onChange: (value) => {
            formik.setErrors({ input: undefined });
            formik.setFieldValue('input', value);
          },
          value: formik.values.input,

          disabled: isLoading,
          max: maxInputNumber,
          min: min,
        }}
        maxAmount={maxInputNumber}
        onClickMax={(value) => {
          formik.setErrors({ input: undefined });
          formik.setFieldValue('input', value);
        }}
      />

      <Typography className={styles.inputError} variant="medium">
        {failureModalText || formik.errors?.input}
      </Typography>
      <div className={styles.btnContainer}>
        <Button
          onSubmit={formik.handleSubmit}
          htmlType="submit"
          shape="round"
          size="large"
          className={styles.submitBtn}
          loading={isLoading}
          disabled={!(formik.values.input > 0) || !!failureModalText}
        >
          {submitText || 'Submit'}
        </Button>
      </div>
    </form>
  );
};
