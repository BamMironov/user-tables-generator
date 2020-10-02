import React, { useMemo } from 'react';

import cn from 'classnames';

import './Table.scss';

const defaultFormatter = value => value;

function Row({ data, formatters }) {
  let fields = Object.keys(formatters);

  return (
    <tr className="Table-Row">
      {fields.map(field => {
        let formatter = formatters[field];
        let value = data[field];

        return (
          <td
            key={field}
            data-title={field}
            className="Table-Cell"
          >
            {formatter(value, data)}
          </td>
        )
      })}
    </tr>
  )
}

function Table({
  data,
  columns,
  className,
  noDataMessage = 'No data',
}) {
  const fieldFormatters = useMemo(() => (
    columns.reduce((result, column) => {
      result[column.dataField] = column.formatter || defaultFormatter;

      return result;
    }, {})
  ), [columns]);

  return (
    <>
      <table className={cn('Table', className)}>
        <thead className="Table-Head">
          <tr className="Table-Row">
            {columns.map(column => (
              <td key={column.dataField} className="Table-Header">
                {column.title}
              </td>
            ))}
          </tr>
        </thead>

        <tbody className="Table-Body">
          {data?.map((o, index) => (
            <Row
              key={o.id || index}
              data={o}
              formatters={fieldFormatters}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;
