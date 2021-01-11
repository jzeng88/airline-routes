import React, { useState, useEffect } from "react";

const Table = ({ rows, columns, format, perPage = 25, className }) => {
  let [page, setPage] = useState(0);

  const nextPage = (event) => {
    event.preventDefault();
    setPage(page + 1);
  };

  const previousPage = (event) => {
    event.preventDefault();
    setPage(page - 1);
  };

  useEffect(() => {
    setPage(0);
  }, []);

  const tableHeaders = columns.map(({ name }) => <th key={name}>{name}</th>);

  const tablePages = (() => {
    let pages = [];

    for (let i = 0; i < rows.length; i += perPage) {
      let page = rows.slice(i, i + perPage);
      pages.push(page);
    }

    return pages;
  })();

  const tableBody = (() => {
    if (tablePages[page] === undefined) {
      return [];
    }

    return tablePages[page].map(({ airline: airlineId, src, dest }) => {
      return (
        <tr key={String(airlineId) + src + dest}>
          <td>{format("airline", airlineId)}</td>
          <td>{format("airport", src)}</td>
          <td>{format("airport", dest)}</td>
        </tr>
      );
    });
  })();

  return (
    <>
      <table className={className}>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <div className="pagination">
        <p>
          Showing {page * perPage + 1}-
          {(page + 1) * (tablePages[page] ? tablePages[page].length : 0)} of{" "}
          {rows.length} routes.
        </p>

        <p>
          <button key="previous" disabled={page === 0} onClick={previousPage}>
            Previous Page
          </button>
          <button
            key="next"
            disabled={page + 1 === tablePages.length}
            onClick={nextPage}
          >
            Next Page
          </button>
        </p>
      </div>
    </>
  );
};

export default Table;
