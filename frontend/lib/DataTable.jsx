import React, { useState } from "react";
import PropTypes from "prop-types";
import { css } from "aphrodite";
import Text from "./Text";
import customStyleSheet from "./customStyleSheet";

const propTypes = {
  columnConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      columnName: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["short-text", "primary-title", "action-link"]),
      generator: PropTypes.func.isRequired,
    })
  ).isRequired,
  rowsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowClickable: PropTypes.bool,
  showHeader: PropTypes.bool,
  showColumnSelector: PropTypes.bool,
  fixedHeader: PropTypes.bool,
  paddingSize: PropTypes.oneOf("default", "large"),
  verticalAlign: PropTypes.oneOf("center", "top", "bottom"),
};

const defaultProps = {
  rowClickable: false,
  showHeader: true,
  showColumnSelector: false,
  fixedHeader: false,
  paddingSize: "default",
  verticalAlign: "center",
};

function DataColumn({ columnConfig, rowData, paddingSize, verticalAlign }) {
  const colData = columnConfig.generator(rowData);
  const style = {
    verticalAlign,
  };
  if (columnConfig.containerWidth) {
    style.width = columnConfig.containerWidth;
  }

  return (
    <td
      className={css(
        styles.td,
        columnConfig.type === "short-text" && styles.tdText,
        columnConfig.type === "primary-title" && styles.tdPrimaryText,
        paddingSize === "large" && styles.tdPaddingLarge
      )}
      style={style}
    >
      {colData && columnConfig.type === "action-link" && (
        <a
          className={css(styles.actionLink)}
          href={colData.href}
          onClick={colData.onClick}
          openInNewWindow={colData.openInNewWindow || false}
        >
          <Text small bold inherit nowrap>
            {`${colData.text} >`}
          </Text>
        </a>
      )}
      {columnConfig.type !== "action-link" && colData}
    </td>
  );
}

function DataRow({
  columnConfigs,
  rowClickable,
  onRowClick,
  rowData,
  showColumnSelector,
  paddingSize,
  verticalAlign,
}) {
  return (
    <tr
      key={rowData.id || rowData.guid}
      className={css(styles.trBody, rowClickable && styles.trBodyClickable)}
      onClick={() => rowClickable && onRowClick(rowData)}
    >
      {columnConfigs.map((columnConfig) => (
        <DataColumn
          key={columnConfig.key || columnConfig.name}
          columnConfig={columnConfig}
          rowData={rowData}
          paddingSize={paddingSize}
          verticalAlign={verticalAlign}
        />
      ))}
      {showColumnSelector && <td className={css(styles.td)} />}
    </tr>
  );
}

function DataTable({
  columnConfigs,
  rowsData,
  rowClickable,
  onRowClick,
  showHeader,
  showColumnSelector,
  defaultColumnsSelected,
  fixedHeader,
  paddingSize,
  verticalAlign,
}) {
  const [showColumnSelectorModal, setShowColumnSelectorModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(
    defaultColumnsSelected || columnConfigs.map((cc) => cc.key)
  );
  const filteredColumnConfigs = columnConfigs.filter(
    (cc) => selectedColumns.indexOf(cc.key) >= 0
  );
  const numColumns = filteredColumnConfigs.length + showColumnSelector ? 1 : 0;
  return (
    <>
      <table
        className={css(styles.tableContainer)}
        style={{
          gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
        }}
      >
        {showHeader && (
          <thead className={css(styles.thead)}>
            <tr className={css(styles.trHead)}>
              {filteredColumnConfigs.map((columnConfig) => (
                <th
                  key={columnConfig.columnName}
                  className={css(styles.th, !fixedHeader && styles.thSticky)}
                >
                  {columnConfig.columnName}
                </th>
              ))}
              {showColumnSelector && (
                <th className={css(styles.th, !fixedHeader && styles.thSticky)}>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip">Select table columns</Tooltip>
                    }
                  >
                    <a
                      className={css(styles.trBodyClickable)}
                      onClick={() => setShowColumnSelectorModal(true)}
                    >
                      <Columns />
                    </a>
                  </OverlayTrigger>
                </th>
              )}
            </tr>
          </thead>
        )}
        <tbody className={css(styles.tbody)}>
          {(rowsData || []).map((rowData) => (
            <DataRow
              key={rowData.id || rowData.guid}
              rowData={rowData}
              rowClickable={rowClickable}
              onRowClick={onRowClick}
              columnConfigs={filteredColumnConfigs}
              showColumnSelector={showColumnSelector}
              paddingSize={paddingSize}
              verticalAlign={verticalAlign}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

DataTable.propTypes = propTypes;
DataTable.defaultProps = defaultProps;

const styles = customStyleSheet(({ bp, color }) => ({
  tableContainer: {
    // display: 'grid',
    width: "100%",
  },
  thead: {
    // display: 'contents',
  },
  tbody: {
    // display: 'contents',
  },
  tr: {
    // display: 'contents',
  },
  trBody: {
    ":hover": {
      background: "#f3f3f3",
    },
    // background: 'white'
  },
  trBodyClickable: {
    cursor: "pointer",
  },
  trHead: {},
  th: {
    verticalAlign: "bottom",
    top: 76,
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 12,
    textTransform: "uppercase",
    color: color.secondary,
    background: "inherit",
    // Why box shadow instead of border bottom?
    boxShadow: `0px 1px 0 ${color.line}`,
    zIndex: 1,
    /* borderBottom: `1px solid ${color.line}`, */
  },
  thSticky: {
    // position: 'sticky',
    background: color.background,
    backgroundColor: color.white,
  },
  td: {
    textOverflow: "ellipsis",
    color: color.dlsDarkText,
    padding: "16px 16px",
    borderBottom: `1px solid ${color.line}`,
  },
  tdPaddingLarge: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  tdHover: {
    background: color.background,
  },
  tdText: {
    overflow: "hidden",
  },
  tdPrimaryText: {
    whiteSpace: "nowrap",
  },
  actionLink: {
    whiteSpace: "nowrap",
  },
}));

export default DataTable;
