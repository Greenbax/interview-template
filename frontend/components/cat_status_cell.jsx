import React, { useState, useRef } from 'react';
import { number, shape, string } from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { gql, useMutation } from '@apollo/client';
import SelectableOption from '../schemas/selectable_option.js';

const UPDATE_VENDOR_STATUS = gql`
  mutation UpdateVendorStatus($id: ID!, $status: Int!) {
    updateVendor(id: $id, status: $status) {
      vendor {
        id,
        status,
      }
    }
  }
`;

const UPDATE_VENDOR_CAT = gql`
  mutation UpdateVendorCat($id: ID!, $category: String!) {
    updateVendor(id: $id, category: $category) {
      vendor {
        id,
        category,
      }
    }
  }
`;

const CatStatusCell = ({ cell }) => {
  const { id, category, status } = cell.row.original;
  let options = [];
  let defaultValue = SelectableOption();
  switch (cell.column.Header) {
    case 'CATEGORY':
      options = [
        SelectableOption(cell.row.original, 'Software'),
        SelectableOption(cell.row.original, 'Consulting, staffing, and professional services'),
        SelectableOption(cell.row.original, 'Other'),
      ];
      defaultValue = SelectableOption(cell.row.original, category);
      break;
    case 'STATUS':
      options = [
        SelectableOption(cell.row.original, 1),
        SelectableOption(cell.row.original, 2),
        SelectableOption(cell.row.original, 3),
      ];
      defaultValue = SelectableOption(status, status);
      break;
    default:
      console.warn('components/cat_status_cell.jsx', 'CatStatusCell has unhandled header');
  }

  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const lastUpdatedValue = useRef(defaultValue);
  const [mutateStatus] = useMutation(UPDATE_VENDOR_STATUS);
  const [mutateCat] = useMutation(UPDATE_VENDOR_CAT);

  const onCompleted = (data) => {
    const { vendor } = data.data.updateVendor;
    const label = vendor.category || vendor.status;
    lastUpdatedValue.current = SelectableOption(vendor, label);
  };

  const onError = () => {
    setSelectedOption(lastUpdatedValue.current);
  };
  const onChange = (selected) => {
    if (selected.label !== selectedOption.label) {
      setSelectedOption(selected);
      switch (cell.column.Header) {
        case 'CATEGORY':
          mutateCat({ variables: { id, category: selected.label } })
            .then(onCompleted)
            .catch(onError);
          break;
        case 'STATUS':
          mutateStatus({ variables: { id, status: selected.label } })
            .then(onCompleted)
            .catch(onError);
          break;
        default:
          console.warn('components/cat_status_cell.jsx', 'CatStatusCell has unhandled header');
      }
    }
  };

  return (
    <CellFrame {...cell.getCellProps()}>
      <Select
        value={selectedOption}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        getOptionValue={(option) => option.label}
      />
    </CellFrame>
  );
};

CatStatusCell.propTypes = {
  cell: shape({
    row: shape({
      original: shape({
        vendor: shape({
          name: string.isRequired,
          description: string.isRequired,
          link: string.isRequired,
        }).isRequired,
        category: string.isRequired,
        status: number.isRequired,
        tier: string.isRequired,
        risk: string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

const CellFrame = styled.td`
  min-width: 10vw;
`;

export default CatStatusCell;
