import React from 'react';
import { css } from 'aphrodite';
import { gql, useQuery } from '@apollo/client';
import { Switch, Route } from 'react-router';

import Text from '../lib/Text';
import customStyleSheet from '../lib/customStyleSheet';


const styles = customStyleSheet(({ color, bp }) => ({
  logo: {
    height: 40,
    width: 40,
    marginRight: 2 * bp,
  },
  container: {
    backgroundColor: color.background,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function VendorManagementPage() {
  return (
    <div className={css(styles.container)}>
      <Text title1>
        Please add vendor page here.
      </Text>
    </div>
  );
}

export default VendorManagementPage;
