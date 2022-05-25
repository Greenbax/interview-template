import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import VendorTable from './components/table.jsx';
import FormatVendorData from './utils/format_vendor_data.js';

const GET_VENDORS_QUERY = gql`
  query GetVendors {
    vendors {
      id,
      name,
      description,
      link,
      category,
      status,
      risk,
      tier,
    }
  }
`;

const App = () => {
  const {
    data: vendorsData,
    loading: vendorsLoading,
    error: vendorsError,
  } = useQuery(GET_VENDORS_QUERY);

  const columnSchema = (Header, accessor) => ({ Header, accessor });
  const columns = React.useMemo(
    () => [
      columnSchema('VENDOR', 'vendor'),
      columnSchema('CATEGORY', 'category'),
      columnSchema('STATUS', 'status'),
      columnSchema('TIER', 'tier'),
      columnSchema('RISK', 'risk'),
    ],
    [],
  );
  if (vendorsLoading) return <h1>Loading</h1>; // TODO make it fancier
  if (vendorsError) return <h1>{vendorsError.message}</h1>; // TODO make it fancier
  return (
    <Backframe>
      <StyledTable>
        <VendorTable columns={columns} data={FormatVendorData(vendorsData.vendors)} />
      </StyledTable>
    </Backframe>
  );
};

const Backframe = styled.div`
  display: flex;
  padding-left: 5vw;
  padding-right: 5vw;
`;

const StyledTable = styled.div`
  display: flex;
  margin-bottom: 10vh;
  table {
    width: 90vw;
    padding-left: 5vw;
    padding-right: 5vw;
    tr,
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid grey;
    }
  }
`;

export default App;
