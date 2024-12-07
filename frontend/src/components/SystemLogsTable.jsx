import React, { useEffect, useContext } from "react";
import { LogsContext } from "../context/LogsContextWrapper";
import { FiRefreshCw } from "react-icons/fi";
import dayjs from "dayjs";
import AsideBar from "./AsideBar";

const SystemLogsTable = () => {
  const {
    logs,
    isLoadingLogs,
    error,
    retrieveLogs,
    handleNextPage,
    handlePrevPage,
    page,
    totalPages,
  } = useContext(LogsContext);

  useEffect(() => {
    retrieveLogs(page);
  }, [page, retrieveLogs]);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden pt-36 ">
      <div className=" max-w-7xl mx-auto flex  ">
        <AsideBar />

        <div className=" bg-gray-50  flex-1 p-4 rounded-xl h-[60vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-2 ">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-indigo-800">
                System Logs
              </h1>
              <button
                onClick={() => retrieveLogs(page)}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                <FiRefreshCw className="text-lg" />
                <span>Refresh</span>
              </button>
            </div>

            {isLoadingLogs ? (
              <div className="text-center py-10 text-gray-600">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              <>
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                  <table className="table-auto w-full text-left">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="px-4 py-2 text-indigo-800">Timestamp</th>
                        <th className="px-4 py-2 text-indigo-800">User</th>
                        <th className="px-4 py-2 text-indigo-800">Email</th>
                        <th className="px-4 py-2 text-indigo-800">Role</th>
                        <th className="px-4 py-2 text-indigo-800">Action</th>
                        <th className="px-4 py-2 text-indigo-800">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-indigo-50 transition-colors duration-200`}
                        >
                          <td className="px-4 py-2">
                            {dayjs(log.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                          </td>
                          <td className="px-4 py-2">{log.User.name}</td>
                          <td className="px-4 py-2">{log.User.email}</td>
                          <td className="px-4 py-2 capitalize">
                            {log.User.role.name}
                          </td>
                          <td className="px-4 py-2">
                            {log.ActivityLog.action}
                          </td>
                          <td className="px-4 py-2">
                            {log.ActivityLog.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    disabled={page === 1}
                    onClick={handlePrevPage}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ${
                      page === 1 && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Previous Page
                  </button>
                  <span className="text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ${
                      page === totalPages && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Next Page
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogsTable;
