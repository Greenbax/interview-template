import React from 'react';
import { CSVLink } from 'react-csv';

import ConvertVendorsCsv from '../utils/convert_vendors_csv.js';

const CsvButton = ({ vendorsData }) => {
  const headers = [
    'Vendor name',
    'Category',
    'Website link',
    'Description',
    'Status',
    'Risk',
    'Tier',
  ];
  return (
    <CSVLink
      data={ConvertVendorsCsv(vendorsData)}
      filename={`vendors_${new Date().getTime()}.csv`}
      headers={headers}
    >
      Export to CSV
    </CSVLink>
  );
};

export default CsvButton;
