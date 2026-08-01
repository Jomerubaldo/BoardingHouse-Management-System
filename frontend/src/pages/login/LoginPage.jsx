import { adminAuth } from "../../api/adminApi";
import LoginImageHouse from "../../assets/download.jpg";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  // lagayan ng error kapag invalid user or password
  const [error, setError] = useState("");
  // loading state
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  // initialize navigate to used if true login
  const navigation = useNavigate();

  const [data, setData] = useState({ username: "", password: "" });
  const { isLogin, setIsLogin } = useAuth();

  const handleChangeAdminAuth = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    // check lang dito kung less na sa 1 ang string or delete
    // is mag empty string na mawawala na erro message
    if (
      (e.target.name === "username" && e.target.value.length === 0) ||
      (e.target.name === "password" && e.target.value.length === 0)
    ) {
      setError("");
    }
  };

  const handleSubmitAdminAuth = async (e) => {
    e.preventDefault();

    setIsLoginLoading(true);
    const result = await adminAuth(data);
    if (result.success) {
      setIsLogin(true);
      navigation("/");
    } else {
      setError("Invalid username or password!");
    }
    setIsLoginLoading(false);
  };

  // check if naka login then kahit mag type ng url sa taas ng /login is
  // hindi siya madirect don kasi chenecheck niya na naka login kapa
  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F4F5] sm:px-10">
      <div className="card min-h-96 w-full max-w-3xl flex-col rounded-none bg-[#2C3038] shadow-sm sm:flex-row sm:rounded-sm">
        <figure className="h-48 w-full rounded-none sm:h-auto sm:w-96 sm:rounded-l-sm sm:rounded-r-none">
          <img
            src={LoginImageHouse}
            alt="Modern house exterior"
            className="h-full w-full"
          />
        </figure>

        <div className="card-body w-full sm:w-96">
          <h2 className="card-title text-accent/80 flex justify-center text-2xl font-bold">
            Login
          </h2>
          <p className="text-center font-semibold text-gray-300">
            Enter your login credentials
          </p>
          <p className="min-h-5 text-center text-xs text-red-500">{error}</p>
          <form onSubmit={handleSubmitAdminAuth}>
            <div className="flex flex-col gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-200">
                  <label htmlFor="username">Username</label>
                </legend>
                <label className="input w-full focus-within:outline-none">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    onChange={handleChangeAdminAuth}
                    value={data.username}
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter your username"
                  />
                </label>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-200">
                  <label htmlFor="password">Password</label>
                </legend>
                <label className="input w-full focus-within:outline-none">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    onChange={handleChangeAdminAuth}
                    value={data.password}
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                  />
                </label>
              </fieldset>
              <div className="flex justify-between">
                <p className="text-xs text-gray-300 sm:text-[10px]">
                  Don't have an account?{" "}
                  <a
                    onClick={() => alert("This feature is under development.")}
                    href="#signup"
                    className="text-accent/80 underline"
                  >
                    Sign Up
                  </a>
                </p>
                <a
                  onClick={() => alert("This feature is under development.")}
                  href="#forgetPassword"
                  className="text-accent/80 text-xs underline sm:text-[10px]"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="btn hover:bg-accent bg-accent/80 mt-3 border-none font-bold text-white shadow-none"
              >
                {isLoginLoading ? "Login..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
