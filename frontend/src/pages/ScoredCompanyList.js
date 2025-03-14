import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ScoredCompanyListPage.css"; // Import CSS for styling

const ScoredCompanyListPage = () => {
  const [scorecards, setScorecards] = useState([]);
  const [filteredScorecards, setFilteredScorecards] = useState([]);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/view-scored-companies/")
      .then((response) => {
        setScorecards(response.data);
        setFilteredScorecards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scorecards:", error);
      });
  }, []);

  const handleFilterChange = () => {
    const filtered = scorecards.filter((scorecard) =>
      filterColumn && filterValue
        ? String(scorecard[filterColumn]).toLowerCase().includes(filterValue.toLowerCase())
        : true
    );
    setFilteredScorecards(filtered);
  };

  const handleSortChange = () => {
    const sorted = [...filteredScorecards].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredScorecards(sorted);
  };

  return (
    <div className="scored-companies-container">
      <h2 className="page-title">Scored Companies</h2>

      {/* Filter & Sort Button */}
      <button className="filter-button" onClick={() => setIsModalOpen(true)}>
        Filter & Sort
      </button>

      {/* Modal for Filtering & Sorting */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="filter-modal">
            <h3>Filter & Sort Companies</h3>

            {/* Filter Section */}
            <label>Filter Column:</label>
            <select value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
              <option value="">Select Column</option>
              <option value="company_name">Company Name</option>
              <option value="sector">Sector</option>
              <option value="investment_stage">Investment Stage</option>
            </select>

            <label>Filter Value:</label>
            <input type="text" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />

            {/* Sorting Section */}
            <label>Sort Column:</label>
            <select value={sortColumn} onChange={(e) => setSortColumn(e.target.value)}>
              <option value="">Select Column</option>
              <option value="date">Date</option>
              <option value="alignment">Alignment</option>
              <option value="team">Team</option>
              <option value="market">Market</option>
              <option value="potential_return">Potential Return</option>
              <option value="product">Product/Science/Tech</option>
              <option value="bold_excitement">Bold Team Excitement</option>
            </select>

            <label>Sort Order:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            {/* Action Buttons */}
            <div className="modal-buttons">
              <button className="apply-button" onClick={() => { handleFilterChange(); handleSortChange(); }}>
                Apply
              </button>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="company-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>Date</th>
            <th>Sector</th>
            <th>Investment Stage</th>
            <th>Alignment</th>
            <th>Team</th>
            <th>Market</th>
            <th>Product/Science/Tech</th>
            <th>Potential Return</th>
            <th>Bold Team Excitement</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredScorecards.map((scorecard, index) => (
            <tr key={index}>
              <td>{scorecard.scored_by?.first_name} {scorecard.scored_by?.last_name}</td>
              <td>{scorecard.company_name}</td>
              <td>{scorecard.date}</td>
              <td>{scorecard.sector}</td>
              <td>{scorecard.investment_stage}</td>
              <td>{scorecard.alignment}</td>
              <td>{scorecard.team}</td>
              <td>{scorecard.market}</td>
              <td>{scorecard.product}</td>
              <td>{scorecard.potential_return}</td>
              <td>{scorecard.bold_excitement}</td>
              <td>{scorecard.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoredCompanyListPage;
