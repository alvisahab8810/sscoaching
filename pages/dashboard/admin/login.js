import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [pendingToken, setPendingToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: verify credentials → receive pendingToken → show OTP input
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      setPendingToken(data.pendingToken);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify OTP → receive session cookie → redirect
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingToken, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      router.replace("/dashboard/");
    } catch (err) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "400px" }}>
        <div className="card-body p-4">

          {/* Step indicator */}
          <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#0f1f3d",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </div>
            <div style={{ width: 40, height: 2, background: pendingToken ? "#0f1f3d" : "#dee2e6" }} />
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: pendingToken ? "#0f1f3d" : "#dee2e6",
                color: pendingToken ? "#fff" : "#aaa",
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
            </div>
          </div>

          <h4 className="text-center mb-1 fw-bold">Admin Login</h4>
          <p className="text-center text-muted small mb-4">
            {pendingToken ? "Enter the OTP sent to the registered email" : "Enter your credentials"}
          </p>

          {error && (
            <div className="alert alert-danger py-2 text-center small">
              {error}
            </div>
          )}

          {/* Step 1: Credentials */}
          {!pendingToken && (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="admin@sscoaching.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {pendingToken && (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-3">
                <label className="form-label fw-semibold">6-Digit OTP</label>
                <input
                  type="text"
                  className="form-control text-center fw-bold fs-4 letter-spacing-wide"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                  required
                  style={{ letterSpacing: "0.4em" }}
                />
                <div className="form-text text-center">OTP expires in 5 minutes</div>
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 mb-2"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying OTP..." : "Verify & Login"}
              </button>

              <button
                type="button"
                className="btn btn-link w-100 text-muted small"
                onClick={() => {
                  setPendingToken(null);
                  setOtp("");
                  setError("");
                }}
              >
                ← Back to login
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
