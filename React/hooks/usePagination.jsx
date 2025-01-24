import { useState } from "react";

/**
 * Custom hook to handle pagination logic for a dataset.
 *
 * @function usePagination
 * @param {Array} data - The dataset to paginate.
 * @param {number} itemsPerPage - The number of items to display per page.
 * @returns {Object} Pagination utilities.
 * @property {function} next - Advances to the next page, if available.
 * @property {function} prev - Goes back to the previous page, if available.
 * @property {function} jump - Jumps to a specific page number.
 * @property {function} currentData - Retrieves the data for the current page.
 * @property {number} currentPage - The current page number.
 * @property {number} maxPage - The maximum number of pages.
 *
 * @example
 * import React from 'react';
 * import usePagination from './usePagination';
 *
 * const ExampleComponent = () => {
 *   const data = [
 *     { id: 1, name: 'Item 1' },
 *     { id: 2, name: 'Item 2' },
 *     { id: 3, name: 'Item 3' },
 *     { id: 4, name: 'Item 4' },
 *     { id: 5, name: 'Item 5' },
 *     { id: 6, name: 'Item 6' },
 *   ];
 *
 *   const itemsPerPage = 2;
 *   const { next, prev, jump, currentData, currentPage, maxPage } = usePagination(data, itemsPerPage);
 *
 *   return (
 *     <div>
 *       <h1>Paginated List</h1>
 *       <ul>
 *         {currentData().map(item => (
 *           <li key={item.id}>{item.name}</li>
 *         ))}
 *       </ul>
 *       <div>
 *         <button onClick={prev} disabled={currentPage === 1}>
 *           Previous
 *         </button>
 *         <span>
 *           Page {currentPage} of {maxPage}
 *         </span>
 *         <button onClick={next} disabled={currentPage === maxPage}>
 *           Next
 *         </button>
 *       </div>
 *       <div>
 *         <input
 *           type="number"
 *           min="1"
 *           max={maxPage}
 *           value={currentPage}
 *           onChange={(e) => jump(Number(e.target.value))}
 *         />
 *         <span> / {maxPage}</span>
 *       </div>
 *     </div>
 *   );
 * };
 *
 * export default ExampleComponent;
 */
function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = itemsPerPage >= data.length ? 1 : Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = itemsPerPage >= data.length ? 0 : (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function nextPage() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prevPage() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jumpPage(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  }

  return { nextPage, prevPage, jumpPage, currentData, currentPage, maxPage };
}

export default usePagination;
