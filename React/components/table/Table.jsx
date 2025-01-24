import { useState, useEffect, useRef } from "react";

// Componentes
import Button from "../../components/button/Button";
import Table from "react-table-lite";

// Icones
import { MdClear } from "react-icons/md";

// Hooks
import usePagination from "../../hooks/usePagination";

// Estilos
import styles from "./Table.module.css";

/**
 * Função para mapear os headers personalizados com base em sortHeaders.
 * Remove caracteres especiais do início de cada chave em sortHeaders e 
 * retorna um novo objeto contendo as chaves de sortHeaders no formato original
 * e seus valores correspondentes no customHeaders.
 */
function mapCustomHeaders(customHeaders, sortHeaders) {
  // Remove caracteres especiais do início das chaves em sortHeaders
  const normalizedSortHeaders = sortHeaders.map(header => header.replace(/^\W+/, ""));

  const result = {};

  // Itera pelas chaves normalizadas e mapeia os valores de customHeaders
  normalizedSortHeaders.forEach(header => {
    for (const key in customHeaders) {
      if (key === header) {
        result[sortHeaders.find(h => h.endsWith(header))] = customHeaders[key]; // Mantém a chave original
      }
    }
  });

  return result;
}

function getDataKey(customHeaders, selectName) {
  return Object.keys(customHeaders).find(
    key => customHeaders[key] === selectName
  );
}

function normalizeString(string) {
  return string?.toString()?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '')?.toLowerCase()?.trim();
}

function centerPagination() {
  // Executa o código duas vezes com um pequeno atraso
  // para garantir que a página selecionada esteja corretamente renderizada 
  for (let i = 0; i < 2; i++) {
    setTimeout(() => {
      // Obtém a página selecionada e todas as páginas da paginação
      const selectedPage = document.querySelector(".react-table-lite-pagination-active-item");
      const pages = document.querySelectorAll(".react-table-lite-pagination-item");

      // Se nenhuma página estiver selecionada, sai da função
      if (!selectedPage) return;

      // Calcula o raio da paginação, ajustando para as primeiras páginas
      const selectedPageIndex = parseInt(selectedPage.innerText, 10) - 1;
      const pageRadius = selectedPageIndex < 6 ? 10 - selectedPageIndex : 5;

      // Itera sobre cada página e oculta/exibe de acordo com o raio.
      pages.forEach((page, index) => {
        if (Math.abs(selectedPageIndex - index) > pageRadius) {
          // Oculta a página se estiver fora do raio.
          page.classList.add("hide_page");
        } else {
          // Exibe a página se estiver dentro do raio.
          page.classList.remove("hide_page");
        }
      });
    }, 10);
  }
}

const TablePaginated = ({ data, noDataMessage, headers, customHeaders, sortHeaders = headers, handleTableSort }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [currentPerPageLimit, setCurrentPerPageLimit] = useState(10);
  const tablePaginationRef = useRef(null);
  const searchInput = useRef(null);

  const fields = Object.values(customHeaders);
  const filteredData = data.filter(item => {
    if (!search) return true;
    // Obtem a chave original do campo a ser filtrado
    const originalKey = getDataKey(customHeaders, filterColumn);
    if (!originalKey) {
      // Se nenhum campo for selecionado, filtre por todos os campos
      return Object.values(item).some(value => {
        const dataString = normalizeString(value);
        const searchString = normalizeString(search);
        return String(dataString).includes(searchString);
      });
    }
    // Filtre pelo campo selecionado
    return String(item[originalKey] || "").toLowerCase().includes(search.toLowerCase());
  });

  const { jumpPage, currentData, maxPage } = usePagination(filteredData, currentPerPageLimit);

  useEffect(() => {
    centerPagination();
  }, []);

  return (
    <>
      <div className={`${styles.search_container} d-flex justify-content-start`}>
        <select
          className={`form-select ${styles.select}`}
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="">Todos os campos</option>
          {fields.map(field => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <div className={styles.input}>
          <input
            ref={searchInput}
            type="text"
            className={`form-control ${styles.search}`}
            placeholder="Buscar..."
            value={search}
            onChange={e => {
              setCurrentPage(1);
              jumpPage(1);
              setSearch(e.target.value)
            }}
          />
          <Button
            onClick={() => { setSearch(""); searchInput.current.focus() }}
            icon={<MdClear className={styles.icon} />}
          />
        </div>
      </div>
      <Table
        tableClass="table_lite"
        data={currentData()}
        noDataMessage={noDataMessage}
        showPagination={data.length > 0}
        currentPage={currentPage}
        currentPerPageLimit={currentPerPageLimit}
        showNumberofPages={data.length}
        showPerPageLimitOptions={data.length > 0}
        totalPages={maxPage}
        perPageLimitOptions={[10, 30, 50, 100]}
        onPaginate={(_, page) => {
          jumpPage(page);
          setCurrentPage(page);
          centerPagination();
          setTimeout(() => tablePaginationRef.current.scrollIntoView({ block: "end", behavior: "instant" }), 15);
        }}
        onPerPageLimitSelect={(_, value) => {
          setCurrentPerPageLimit(parseInt(value, 10));
          jumpPage(1);
          setCurrentPage(1);
        }}
        perpageLimitOptionClass="form-select"
        headers={headers}
        customHeaders={customHeaders}
        sortBy={sortHeaders.map(header => header.replace(/^\W+/, ""))}
        onSort={(e) => handleTableSort(e, mapCustomHeaders(customHeaders, sortHeaders))}
      />
      <div ref={tablePaginationRef}></div>
    </>
  );
};

export { TablePaginated as Table };