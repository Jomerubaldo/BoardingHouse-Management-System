import { useEffect, useState } from 'react';
import { SquarePen, Trash2, Plus } from 'lucide-react';

function Tenant() {
  const [getTenantsData, setGetTenantsData] = useState([]);
  const [deleteTenantData, setDeleteTenantData] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [createFormData, setCreateFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  // para sa pagkuha ng bagong na edit na value
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // kapag nag click ng specific na edit table makukuha ang existing data
  const handleEditClick = (tenant) => {
    setEditFormData({
      tenantID: tenant.tenantID,
      firstName: tenant.firstName,
      lastName: tenant.lastName,
      phoneNumber: tenant.phoneNumber,
    });
    document.getElementById('editModal').showModal();
  };

  // form submit final action fetch
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/tblTenant`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Tenant saved successfully!');
        // clear after submit form
        // setEditFormData({ firstName: '', lastName: '', phoneNumber: '' });
        fetchViewTenants(); // ipakita agad ang data pagtapos ma clear at ma submit
        document.getElementById('editModal').close();
      } else {
        console.error('Something went wrong:' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server. Please check your connection');
    }
  };

  // para sa pag kuha ng e cre-create na value
  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  // final submit action fetch
  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/tblTenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createFormData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Tenant saved successfully!');
        // clear after submit form
        setCreateFormData({ firstName: '', lastName: '', phoneNumber: '' });
        fetchViewTenants(); // ipakita agad ang data pagtapos ma clear at ma submit
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
  const fetchViewTenants = () => {
    fetch('http://localhost:8080/api/tblTenant')
      .then((res) => res.json())
      .then((data) => setGetTenantsData(data))
      .catch((err) => console.error(err));
  };

  // isang beses lang mag rurun
  useEffect(() => {
    fetchViewTenants();
  }, []);

  // para kapag na click alam yung tenantID na e dedelete sa db
  const handleDeleteClick = (tenant) => {
    setDeleteTenantData(tenant);
    document.getElementById('deleteModal').showModal();
  };

  // final submit action fetch delete
  const handleSubmitDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/tblTenant', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantID: deleteTenantData.tenantID }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Delete successfully');
        fetchViewTenants();
        document.getElementById('deleteModal').close();
      } else {
        console.error('Something went wrong:' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server, Please check your connection');
    }
  };

  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            Tenant Management
          </div>
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
              <form onSubmit={handleSubmitCreate} className="space-y-4">
                <div>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={createFormData.firstName}
                    onChange={handleCreateChange}
                    placeholder="First Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={createFormData.lastName}
                    onChange={handleCreateChange}
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="phoneNumber"
                    value={createFormData.phoneNumber}
                    onChange={handleCreateChange}
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
                    className="btn btn-info"
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
        </div>
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
              {getTenantsData.map((tenantData, index) => (
                <tr key={index}>
                  <td>{tenantData.firstName}</td>
                  <td>{tenantData.lastName}</td>
                  <td>{tenantData.phoneNumber}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-accent btn-xs"
                      onClick={() => handleEditClick(tenantData)}
                    >
                      <SquarePen size={15} />
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDeleteClick(tenantData)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <dialog id="editModal" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit Tenant</h3>
              <p className="py-4">Edit tenant information:</p>
              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <div>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditChange}
                    placeholder="First Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditChange}
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <input
                    required
                    type="text"
                    name="phoneNumber"
                    value={editFormData.phoneNumber}
                    onChange={handleEditChange}
                    placeholder="Contact"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => document.getElementById('editModal').close()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
          <dialog
            id="deleteModal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete Confirmation</h3>
              <p className="py-4">Are you sure you want to delete this?</p>
              <div className="modal-action">
                <form onSubmit={handleSubmitDelete}>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="submit" className="btn btn-error">
                      Yes, Delete it
                    </button>
                    <button type="button" className="btn btn-info">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
export default Tenant;
