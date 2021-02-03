import React from 'react';
import { css } from 'aphrodite';
import { gql, useQuery } from '@apollo/client';
import { Switch, Route } from 'react-router';

import Text from '../lib/Text';
import customStyleSheet from '../lib/customStyleSheet';
import evergreenIcon from '../img/evergreen_icon.png';
import getImageUri from '../utils/getImageUri';

const GET_USER_QUERY = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      firstName
      lastName
    }
  }
`;

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

function UserPage({ match }) {
  const { data } = useQuery(GET_USER_QUERY, {
    variables: {
      id: match.params.id,
    },
  });


  const user = data && data.user;
  return (
    <div>
      <div className={css(styles.container)}>
        {user && (
          <div>
            <Text title1>
              Manage {user.firstName} {user.lastName}’s profile
            </Text>
            <Text>
              First name: {user.firstName}
            </Text>
            <Text>
              Last name: {user.lastName}
            </Text>
            <Text>
              Email: {user.email}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
