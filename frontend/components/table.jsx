import {
  arrayOf, number, shape, string,
} from 'prop-types';
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import VendorCell from './vendor_cell.jsx';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          <tr>
            {headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => RenderTableCell(cell))}
                </tr>
              );
            },
          )}
        </tbody>
      </table>
      <br />
    </>
  );
};

Table.propTypes = {
  columns: arrayOf(shape({
    Header: string.isRequired,
    accessor: string.isRequired,
  })).isRequired,
  data: arrayOf(shape({
    vendor: shape({
      name: string.isRequired,
      description: string.isRequired,
      link: string.isRequired,
    }).isRequired,
    category: string.isRequired,
    status: string.isRequired,
    tier: string.isRequired,
    risk: string.isRequired,
  })).isRequired,
};

const RenderTableCell = (cell) => {
  switch (cell.column.Header) {
    case 'VENDOR': return <VendorCell cell={cell} />;
    default: return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
  }
};

export default Table;
