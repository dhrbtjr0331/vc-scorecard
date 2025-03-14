import React, { useState } from "react";
import "../styles/ScoreCompanyPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ScoreCompanyPage = () => {
  const [date, setDate] = useState(new Date());
  const [sector, setSector] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [investmentStage, setInvestmentStage] = useState("");
  const [alignment, setAlignment] = useState(5);
  const [team, setTeam] = useState(5);
  const [market, setMarket] = useState(5);
  const [product, setProduct] = useState(5);
  const [potentialReturn, setPotentialReturn] = useState(5);
  const [boldExcitement, setBoldExcitement] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      date: date.toISOString().split("T")[0],
      company_name: companyName,
      sector,
      investment_stage: investmentStage,
      alignment,
      team,
      market,
      product,
      potential_return: potentialReturn,
      bold_excitement: boldExcitement,
    };

    axios
      .post("http://127.0.0.1:8000/api/score-company/", data)
      .then(() => {
        alert("Form submitted successfully!");
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to submit form. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="form-page">
      <h2 className="form-title">Score a Company</h2>
      <p className="form-subtitle">Provide details and rate the company below</p>

      <form onSubmit={handleSubmit} className="form-layout">
        {/* Left Section - Company Information */}
        <div className="form-left">
          <div className="mb-3">
            <label className="form-label">Date</label>
            <DatePicker selected={date} onChange={(date) => setDate(date)} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Sector</label>
            <input type="text" className="form-control" value={sector} onChange={(e) => setSector(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Investment Stage</label>
            <input type="text" className="form-control" value={investmentStage} onChange={(e) => setInvestmentStage(e.target.value)} />
          </div>
        </div>

        {/* Middle Section - Evaluation */}
        <div className="form-middle">
          <h3 className="evaluation-title">Evaluation</h3>
          {[
            { label: "Alignment", state: alignment, setState: setAlignment },
            { label: "Team", state: team, setState: setTeam },
            { label: "Market", state: market, setState: setMarket },
            { label: "Product/Tech", state: product, setState: setProduct },
            { label: "Potential Return", state: potentialReturn, setState: setPotentialReturn },
            { label: "Bold Excitement", state: boldExcitement, setState: setBoldExcitement },
          ].map((item, index) => (
            <div className="score-item" key={index}>
              <div className="score-label">
                <label className="form-label">{item.label}</label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="10"
                  value={item.state}
                  onChange={(e) => item.setState(parseInt(e.target.value))}
                />
                <p>Score: {item.state}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="form-footer">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScoreCompanyPage;
