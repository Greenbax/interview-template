import { shape, string } from 'prop-types';
import React from 'react';
import Collapsible from 'react-collapsible-paragraph';
import styled from 'styled-components';

import Constants from '../config/constants.js';

const VendorCell = ({ cell }) => {
  const { description, link, name } = cell.value;
  return (
    <VendorCellFrame {...cell.getCellProps()}>
      <h4>{name}</h4>
      <DescriptionBox description={description} />
      <br />
      <br />
      <a href={link} target="_blank">{link}</a>
    </VendorCellFrame>
  );
};

VendorCell.propTypes = {
  cell: shape({
    value: shape({
      description: string.isRequired,
      link: string.isRequired,
      name: string.isRequired,
    }),
  }).isRequired,
};

const DescriptionBox = ({ description }) => (
  <Collapsible lines={3}>{description}</Collapsible>
);

DescriptionBox.propTypes = {
  description: string.isRequired,
};

const VendorCellFrame = styled.td`
  max-width: 20vw;
  h4 {
    margin-bottom: 0.5vh;
  }

  a {
    color: ${Constants.COLORS.LINK_ACTIVE};
  }

  a: visited{  
      color: ${Constants.COLORS.LINK_CLICKED};  
    }  
`;

export default VendorCell;
