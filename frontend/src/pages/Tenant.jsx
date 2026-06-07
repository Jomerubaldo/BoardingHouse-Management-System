import { useEffect, useState } from 'react';

function Tenant() {
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/tblTenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Tenant saved successfully!');
        // clear after submit form
        setFormData({ firstName: '', lastName: '', phoneNumber: '' });
        fetchTenants(); // ipakita agad ang data pagtapos ma clear at ma submit
        document.getElementById('my_modal_5').close();
      } else {
        console.error('Something went wrong:' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server. Please check your connection');
    }
  };

  //get all data from tenants
  const fetchTenants = () => {
    fetch('http://localhost:8080/api/tblTenant')
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <di v className="flex justify-between items-center">
          <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            Tenant Management
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('my_modal_5').showModal()}
          >
            Add Tenant
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-middle sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Create Tenant</h3>
              <p className="py-4">Fill out the tenant information:</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Contact"
                    className="input input-bordered w-full"
                  />
                </div>
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
        <div className="overflow-x-auto overflow-y-auto max-h-152.5 rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td>{tenant.firstName}</td>
                  <td>{tenant.lastName}</td>
                  <td>{tenant.phoneNumber}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Tenant;
