import React from 'react';
import { Pagination as BsPagination } from 'react-bootstrap';

const pagesAround = 3;

function Pagination({ page, pagesCount, itemsCount, pageSize, onPageChange, size }) {
  const totalPages =
    pagesCount || Math.trunc((itemsCount + pageSize - 1) / pageSize);

  const handlePageChange = (value) => (e) => {
    e.preventDefault();
    if (onPageChange) onPageChange(value);
  };

  const items = [];
  for (let number = 1; number <= totalPages; number += 1) {
    if (
      number === 1 ||
      number === totalPages ||
      Math.abs(page - number) <= pagesAround
    ) {
      if (
        number !== 1 &&
        number !== totalPages &&
        Math.abs(page - number) === pagesAround
      ) {
        items.push(<BsPagination.Ellipsis key="ellipsis" />);
      } else {
        items.push(
          <BsPagination.Item
            onClick={handlePageChange(number)}
            key={number}
            active={number === page}
          >
            {number}
          </BsPagination.Item>,
        );
      }
    }
  }

  return (
    <nav className="d-xl-flex justify-content-xl-end">
      <BsPagination size={size}>
        <BsPagination.First onClick={handlePageChange(1)} disabled={page === 1} />
        {items}
        <BsPagination.Last
          onClick={handlePageChange(totalPages)}
          disabled={totalPages === page}
        />
      </BsPagination>
    </nav>
  );
}

export default Pagination;
