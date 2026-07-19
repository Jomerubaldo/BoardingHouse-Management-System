import LoginImageHouse from '../../assets/download.jpg';

function LoginPage() {
  return (
    <div className="bg-[#F4F4F5] w-full min-h-screen flex items-center justify-center px-4 sm:px-10">
      <div className="card flex-col sm:flex-row bg-[#2C3038] shadow-sm w-full max-w-3xl min-h-96">
        {/* Image side - width constrained, object-cover para hindi ma-distort */}
        <figure className="sm:w-96 w-full h-48 sm:h-auto rounded-r-none">
          <img
            src={LoginImageHouse}
            alt="Modern house exterior"
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body w-full sm:w-96">
          <h2 className="card-title flex justify-center font-bold text-2xl text-accent">
            Login
          </h2>
          <p className="text-center font-semibold text-gray-300">
            Enter your login credentials
          </p>

          <form>
            <div className="flex flex-col gap-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-200">
                  <label htmlFor="username">Username</label>
                </legend>
                <label className="input validator w-full focus-within:outline-none">
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
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength="3"
                    maxLength="30"
                    title="Only letters, numbers or dash"
                  />
                </label>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-200">
                  <label htmlFor="password">Password</label>
                </legend>
                <label className="input validator w-full focus-within:outline-none">
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
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                </label>
              </fieldset>

              <button
                type="submit"
                className="btn btn-accent font-bold shadow-none border-none text-white"
              >
                Login
              </button>

              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-300">
                  Don't have an account?{' '}
                  <a href="#signup" className="text-accent underline">
                    Sign Up
                  </a>
                </p>
                <a
                  href="#forgetPassword"
                  className="text-xs underline text-accent"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
