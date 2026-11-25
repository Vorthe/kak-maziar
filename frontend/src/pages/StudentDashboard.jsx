import React, { useEffect, useState } from "react";
import api from "../api";

export default function StudentDashboard({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await api.get("/api/classes/my-requests");
      setRequests(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequestClass = async () => {
    try {
      await api.post("/api/classes/request", { status: "new" });
      setSuccessMessage("Class request submitted. Please wait for a proposed time.");
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit class request.");
    }
  };

  const handleConfirmTime = async (id) => {
    try {
      await api.post(`/api/classes/${id}/confirm`);
      setSuccessMessage("Class time confirmed! Booking is complete.");
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to confirm class time.");
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "new" || r.status === "proposed");

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "#6b7280",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div>
      <header
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: "2rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem" }}>Student Dashboard</h1>
        <p style={{ color: "#9ca3af", fontSize: "1rem" }}>
          Hello, {user?.name}. Manage your class bookings here.
        </p>
      </header>

      <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        {error && (
          <div style={{ color: "#dc2626", marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#fef2f2", borderRadius: "6px" }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{ color: "#16a34a", marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "6px" }}>
            {successMessage}
          </div>
        )}

        {/* Request a Class Button */}
        {pendingRequests.length === 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <button
              onClick={handleRequestClass}
              style={{
                padding: "0.9rem 1.5rem",
                backgroundColor: "#111827",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              + Request a Class
            </button>
          </div>
        )}

        {/* Requests List */}
        {pendingRequests.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", color: "#111827" }}>My Class Requests</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {pendingRequests.map((r) => (
                <div
                  key={r.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                      Status: <span style={{ color: "#374151", fontWeight: 600 }}>{r.status}</span>
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                      Created: {new Date(r.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>

                  {r.status === "proposed" && r.proposed_time && (
                    <div style={{ marginBottom: "1rem" }}>
                      <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                        Proposed Time: <span style={{ color: "#374151", fontWeight: 600 }}>{new Date(r.proposed_time).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</span>
                      </span>
                    </div>
                  )}

                  {r.status === "proposed" && (
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        onClick={() => handleConfirmTime(r.id)}
                        style={{
                          padding: "0.6rem 1.2rem",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                        }}
                      >
                        Confirm Time
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {requests.length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
            <p style={{ marginBottom: "1rem" }}>No class requests yet.</p>
            <button
              onClick={handleRequestClass}
              style={{
                padding: "0.8rem 1.5rem",
                backgroundColor: "#111827",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              Request a Class
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
