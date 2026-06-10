import { useEffect, useState } from 'react';
import { SquarePen, Trash2, Plus } from 'lucide-react';
import {
  getAllTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from '../api/tenantApi.js';

function Tenant() {
  const [createFormData, setCreateFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [getTenantsData, setGetTenantsData] = useState([]);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [deleteTenantData, setDeleteTenantData] = useState(null);

  // para sa pag kuha ng e cre-create na value
  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  // submit create
  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    try {
      const result = await createTenant(createFormData);
      if (result.success) {
        alert('Tenant saved successfully!');
        // clear after submit form
        setCreateFormData({ firstName: '', lastName: '', phoneNumber: '' });
        fetchViewTenants(); // ipakita agad ang data pagtapos ma clear at ma submit
        document.getElementById('addModal').close();
      } else {
        console.error('Something went wrong:' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server. Please check your connection');
    }
  };

  //get all data from tblTenant
  const fetchViewTenants = async () => {
    try {
      const result = await getAllTenants();
      setGetTenantsData(result);
    } catch (err) {
      console.error(err);
    }
  };
  // para mag realod agad ang data pagkatapos mag create or update or delete parang live processing
  useEffect(() => {
    fetchViewTenants();
  }, []);

  // para sa pagkuha ng bagong na edit na value
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // kapag nag click ng specific na edit sa btn tablelist makukuha ang existing data
  const handleEditClick = (tenant) => {
    setEditFormData({
      tenantID: tenant.tenantID,
      firstName: tenant.firstName,
      lastName: tenant.lastName,
      phoneNumber: tenant.phoneNumber,
    });
    document.getElementById('editModal').showModal();
  };

  // submit update
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateTenant(editFormData);
      if (result.success) {
        alert('Tenant Saved Successfully!');
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

  // para kapag na click alam yung tenantID na e dedelete sa db
  const handleDeleteClick = (tenant) => {
    setDeleteTenantData(tenant);
    document.getElementById('deleteModal').showModal();
  };

  // submit delete
  const handleSubmitDelete = async (e) => {
    e.preventDefault();

    try {
      const result = await deleteTenant(deleteTenantData.tenantID);

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
            onClick={() => document.getElementById('addModal').showModal()}
          >
            <Plus size={18} />
            Add Tenant
          </button>
          <dialog id="addModal" className="modal modal-middle sm:modal-middle">
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
                    onClick={() => document.getElementById('addModal').close()}
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
                    <button
                      onClick={() =>
                        document.getElementById('deleteModal').close()
                      }
                      type="button"
                      className="btn btn-info"
                    >
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
