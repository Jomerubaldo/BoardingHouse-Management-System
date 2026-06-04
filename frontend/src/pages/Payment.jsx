function Payment() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <di v className="flex justify-between items-center">
          <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            Payment Management
          </div>
          <button className="badge badge-primary btn btn-xs sm:btn-sm md:btn-md sm:text-sm md:text-md">
            Add Payment
          </button>
        </di>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>Jomer Ubaldo</td>
                <td>Room 1</td>
                <td>2026-03-02</td>
                <td>1500</td>
                <td className="flex gap-2">
                  <button className="btn btn-accent btn-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-square-pen-icon lucide-square-pen"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                    </svg>
                  </button>
                  <button className="btn btn-error btn-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-trash2-icon lucide-trash-2"
                    >
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>Jelly Ubaldo</td>
                <td>Room 2</td>
                <td>2026-05-07</td>
                <td>2000</td>
                <td>
                  <button className="btn btn-xs">Edit</button>
                  <button className="btn btn-xs">Delete</button>
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>Mercy Ubaldo</td>
                <td>Room 3</td>
                <td>2026-07-09</td>
                <td>5000</td>
                <td>
                  <button className="btn btn-xs">Edit</button>
                  <button className="btn btn-xs">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Payment;
