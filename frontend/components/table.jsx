import {
  arrayOf, number, shape, string, func,
} from 'prop-types';
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import VendorCell from './vendor_cell.jsx';
import CatStatusCell from './cat_status_cell.jsx';

const Table = ({ columns, data }) => {
  const _renderTableCell = (cell) => {
    switch (true) {
      case cell.column.Header === 'VENDOR': return <VendorCell cell={cell} />;
      case ['CATEGORY', 'STATUS'].indexOf(cell.column.Header) > -1:
        return (
          <CatStatusCell cell={cell} />
        );
      default: return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
    }
  };

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

  const renderFilterIcon = (column) => {
    if (column.isSorted) {
      return column.isSortedDesc ? ' 🔽' : ' 🔼';
    }
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          <tr>
            {headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {renderFilterIcon(column)}
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
                // eslint-disable-next-line react/jsx-key
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => _renderTableCell(cell))}
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
    status: number.isRequired,
    tier: string.isRequired,
    risk: string.isRequired,
  })).isRequired,
};

export default Table;
