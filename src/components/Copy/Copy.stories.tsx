// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Copy from './Copy';

export default {
  title: 'Copy',
  component: Copy,
} as ComponentMeta<typeof Copy>;

const Template: ComponentStory<typeof Copy> = (args) => <Copy {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: 'Hello World',
};