import React from "react";
import { css } from "aphrodite";
import { gql, useMutation, useQuery } from "@apollo/client";

import Text from "./lib/Text";
import customStyleSheet from "./lib/customStyleSheet";
import evergreenIcon from "./img/evergreen_icon.png";
import getImageUri from "./utils/getImageUri";
import DataTable from "./lib/DataTable";

const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
      firstName
      lastName
      email
      isAdmin
    }
  }
`;

const EDIT_USER_MUTATION = gql`
  mutation EditUser($id: Int!, $name: String) {
    editUser(id: $id, name: $name) {
      success
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
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function getColumnConfigs(editUser) {
  return [
    {
      key: "user_id",
      columnName: "User id",
      type: "short-text",
      generator: (user) => user.id,
    },
    {
      key: "first_name",
      columnName: "First name",
      type: "primary-title",
      generator: (user) => (
        <input
          value={user.firstName}
          onChange={(e) => {
            editUser({
              variables: {
                id: user.id,
                name: e.target.value,
              },
            });
          }}
        />
      ),
    },
    {
      key: "last_name",
      columnName: "Last name",
      type: "primary-title",
      generator: (user) => user.lastName,
    },
    {
      key: "email",
      columnName: "Email",
      type: "primary-title",
      generator: (user) => user.email,
    },
    {
      key: "is_admin",
      columnName: "Is admin",
      type: "short-text",
      generator: (user) => (user.isAdmin ? "True" : "False"),
    },
  ];
}

function UserManagementPage() {
  const { data } = useQuery(GET_ALL_USERS_QUERY);
  const [editUser] = useMutation(EDIT_USER_MUTATION);

  return (
    <DataTable
      rowsData={data?.users}
      columnConfigs={getColumnConfigs(editUser)}
    />
  );
}

export default UserManagementPage;
