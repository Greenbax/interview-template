import React, { useState } from 'react';
import { css } from 'aphrodite';
import { gql, useQuery } from '@apollo/client';
import { Switch, Route } from 'react-router';

import Text from '../lib/Text';
import customStyleSheet from '../lib/customStyleSheet';
import evergreenIcon from '../img/evergreen_icon.png';
import getImageUri from '../utils/getImageUri';
import DataTable from '../lib/DataTable';

const GET_USERS_QUERY = gql`
  query SearchUsers($searchText: String) {
    users(
      searchText: $searchText,
    ) {
      firstName
      lastName
      email
      isAdmin
      id
    }
  }
`;

const COLUMN_CONFIGS = [
  {
    key: 'user_id',
    columnName: 'User id',
    type: 'short-text',
    generator: (user) => user.id,
  },
  {
    key: 'first_name',
    columnName: 'First name',
    type: 'action-link',
    generator: (user) => {
      return user.lastName;
    },
  },
  {
    key: 'last_name',
    columnName: 'Last name',
    type: 'primary-title',
    generator: (user) => {
      return user.lastName;
    },
  },
  {
    key: 'email',
    columnName: 'Email',
    type: 'primary-title',
    generator: (user) => {
      return user.email;
    },
  },
  {
    key: 'is_admin',
    columnName: 'Is admin',
    type: 'short-text',
    generator: (user) => {
      return user.isAdmin ? 'True' : 'False';
    },
  },
  {
    key: 'link',
    columnName: 'Link',
    type: 'action-link',
    generator: (user) => {
      return {
        text: 'View',
        href: `/user/3`,
        openInNewWindow: true,
      };
    },
  },
];

const styles = customStyleSheet(({ color, bp }) => ({
  logo: {
    height: 40,
    width: 40,
    marginRight: 2 * bp,
  },
  container: {
    backgroundColor: color.background,
    padding: bp * 4,
  },
}));

function App() {
  const [searchText, setSearchText] = useState(null);
  const { data } = useQuery(GET_USERS_QUERY, {
    variables: {
      searchText,
    }
  });

  const users = data && data.users;
  return (
    <div className={css(styles.container)}>
      <Text title1>
        User management
      </Text>
      <div style={{ marginTop: 16 }} />
      <input type="text" placeholder="Search users here" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <div style={{ marginTop: 16 }} />
      <DataTable
        columnConfigs={COLUMN_CONFIGS}
        rowsData={users}
      />
    </div>
  );
}

export default App;
