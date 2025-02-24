import { useState } from "react";

export default function FinanceApp() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [financeData, setFinanceData] = useState([]);
  const [input, setInput] = useState({ source: "", amount: "", date: "" });
  const [filter, setFilter] = useState("thisMonth");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignupToggle = () => setSignup(!signup);

  const handleAuth = () => {
    if (form.email && form.password) {
      setIsAuthenticated(true);
    }
  };

  const handleFinanceSubmit = () => {
    if (input.source && input.amount && input.date) {
      setFinanceData([...financeData, input]);
      setInput({ source: "", amount: "", date: "" });
    }
  };

  const handleDelete = (index) => {
    setFinanceData(financeData.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f3f3f3", padding: "20px" }}>
      {!isAuthenticated ? (
        <div 
          style={{ width: "100%", maxWidth: "400px", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>{signup ? "Sign Up" : "Login"}</h2>
          <input 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleInputChange} 
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={handleInputChange} 
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button onClick={handleAuth} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
            {signup ? "Sign Up" : "Login"}
          </button>
          <p 
            style={{ textAlign: "center", marginTop: "10px", color: "#007bff", cursor: "pointer" }}
            onClick={handleSignupToggle}
          >
            {signup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </p>
        </div>
      ) : (
        <div style={{ marginTop: "30px", width: "100%", maxWidth: "600px", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <h3 style={{ marginBottom: "10px" }}>Finance Tracker</h3>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: "10px", padding: "5px" }}>
            <option value="thisDay">This Day</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </select>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input 
              placeholder="Source" 
              value={input.source} 
              onChange={(e) => setInput({ ...input, source: e.target.value })} 
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input 
              placeholder="Amount" 
              type="number" 
              value={input.amount} 
              onChange={(e) => setInput({ ...input, amount: e.target.value })} 
              style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input 
              type="date" 
              value={input.date} 
              onChange={(e) => setInput({ ...input, date: e.target.value })} 
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <button onClick={handleFinanceSubmit} style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
              Add
            </button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Source</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {financeData.map((item, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{item.source}</td>
                  <td style={{ padding: "10px" }}>{item.amount}</td>
                  <td style={{ padding: "10px" }}>{item.date}</td>
                  <td style={{ padding: "10px" }}>
                    <button onClick={() => handleDelete(index)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
