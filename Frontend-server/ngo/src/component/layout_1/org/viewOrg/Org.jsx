import cx from "classnames";
import s from "./Org.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrg } from "../../../../store/org/OrgService";
import { VIEW_COUNT } from "../../../utils/constant";
import Pagination from "../../../utils/pagination/Pagination";

function Org() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [searchValue] = useState("");

  const orgLoading = useSelector((state) => state?.orgData?.orgLoading);
  const orgList = useSelector((state) => state?.orgData?.orgList);

  const getHeaders = (data) => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  };
  const headers = getHeaders(orgList);
  console.log("1")

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(getOrg({ pageNo: currentPage, VIEW_COUNT, searchValue }));
    }, 50);
    return () => {
      clearTimeout(handler);
    };
  }, [dispatch, currentPage, searchValue]);

  return (
    <div className={cx(s.orgContainer)}>
      <div className={cx(s.filterContainer)}></div>
      <div className={cx(s.org)}>
        <div className={cx(s.tableContainer)}>
          {orgLoading ? (
            <div className={cx(s.loading)}>Loading...</div>
          ) : orgList && orgList.length > 0 ? (
            <table className={cx(s.orgTable)}>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className={cx(s.tableHeader)}>
                      {header
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orgList.map((org, rowIndex) => (
                  <tr key={rowIndex} className={cx(s.tableRow)}>
                    {headers.map((header, colIndex) => (
                      <td key={colIndex} className={cx(s.tableData)}>
                        {org[header] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={cx(s.noData)}>No organization data available</div>
          )}
        </div>
      </div>
      <div className={cx(s.pagination)}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Org;
