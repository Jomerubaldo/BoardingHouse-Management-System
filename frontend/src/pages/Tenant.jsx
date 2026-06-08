import { useEffect, useState } from 'react';
import { SquarePen, Trash2, Plus } from 'lucide-react';

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
            <Plus size={18} />
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
            <thead>
              <tr className="bg-base-200">
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
                      <SquarePen size={15} />
                    </button>
                    <button className="btn btn-error btn-xs">
                      <Trash2 size={15} />
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
