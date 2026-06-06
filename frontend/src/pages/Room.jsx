function Room() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <di v className="flex justify-between items-center">
          <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            Room Management
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('my_modal_5').showModal()}
          >
            Add Room
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-middle sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Create Room</h3>
              <p className="py-4">Fill out the room information:</p>
              <form className="space-y-4">
                <div>
                  <select defaultValue="Pick a color" className="select w-full">
                    <option disabled={true}>Select tenant</option>
                    <option>Jomer Ubaldo</option>
                    <option>Jelly Ubaldo</option>
                    <option>Mercy Ubaldo</option>
                  </select>
                </div>
                <div>
                  <select defaultValue="Pick a color" className="select w-full">
                    <option disabled={true}>Select room</option>
                    <option>Room 1</option>
                    <option>Room 2</option>
                    <option>Room 3</option>
                  </select>
                </div>
                <div>
                  <select defaultValue="Pick a color" className="select w-full">
                    <option disabled={true}>Select rent</option>
                    <option>1500.00</option>
                    <option>2000.00</option>
                    <option>5000.00</option>  
                  </select>
                </div>
                <select defaultValue="Pick a color" className="select w-full">
                  <option disabled={true}>Select status</option>
                  <option>Occupied</option>
                  <option>Vacant</option>
                  <option>Maintenance</option>
                </select>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-error"
                    onClick={() =>
                      document.getElementById('my_modal_5').close()
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </di>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Rent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>Jomer Ubaldo</td>
                <td>Room 1</td>
                <td>1500</td>
                <td>Occupied</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Room;
