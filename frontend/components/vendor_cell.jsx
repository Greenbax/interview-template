import { shape, string } from 'prop-types';
import React from 'react';
import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';

import Constants from '../config/constants.js';

const VendorCell = ({ cell }) => {
  const { description, link, name } = cell.value;
  return (
    <VendorCellFrame {...cell.getCellProps()}>
      <h4>{name}</h4>
      <ReadMoreReact text={description} readMoreText="> Read More" />
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
