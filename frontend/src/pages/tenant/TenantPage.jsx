import { useEffect, useState } from 'react';
import { SquarePen, Trash2, CirclePlus, Plus } from 'lucide-react';
import {
  getAllTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from '../../api/tenantApi.js';

function TenantPage() {
  const [createFormData, setCreateFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [getTenantsData, setGetTenantsData] = useState([]); // gamitin nalang to kapag mag search filter same lang naman sila ng purpose
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [deleteTenantData, setDeleteTenantData] = useState(null);
  // for search filter in tablelist
  const [search, setSearch] = useState('');

  // para sa pag kuha ng e cre-create na value
  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createTenant(createFormData);
      if (result.success) {
        alert('Tenant saved successfully!');
        // clear after submit form
        setCreateFormData({ firstName: '', lastName: '', phoneNumber: '' });
        fetchTenants(); // makikita agad ang na add na tenant pagkatapos mag submit
        document.getElementById('addModal').close();
      } else {
        console.error('Something went wrong:' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server. Please check your connection');
    }
  };

  // if cancel the button to submit the value reset to empty again

  const clearCreateButtonWhenClose = (e) => {
    e.preventDefault();
    setCreateFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
    });

    document.getElementById('addModal').close();
  };

  //get all data from tblTenant
  const fetchTenants = async () => {
    try {
      const result = await getAllTenants();
      setGetTenantsData(result);
    } catch (err) {
      console.error(err);
    }
  };

  // para mag realod agad ang data pagkatapos mag create or update or delete parang live processing
  useEffect(() => {
    fetchTenants(); // pwede i declared sa post,put,delete para every done ng process is makikita live value
  }, []);

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

  // para sa pagkuha ng bagong na edit na value
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // submit update
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateTenant(editFormData);
      if (result.success) {
        alert('Tenant Saved Successfully!');
        // clear after submit form
        // setEditFormData({ firstName: '', lastName: '', phoneNumber: '' });
        fetchTenants(); // ipakita agad ang data pagtapos ma clear at ma submit
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
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteTenant(deleteTenantData.tenantID);

      if (result.success) {
        alert('Delete successfully');
        fetchTenants();
        document.getElementById('deleteModal').close();
      } else {
        console.error('Something went wrong:' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server, Please check your connection');
    }
  };

  // for searching filter tenant in tablelist
  // confusing na part dito
  const tableSearchTenant = getTenantsData.filter((tenant) =>
    tenant.firstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="font-bold sm:text-md md:text-lg lg:text-lg xl:text-2xl">
            <h1>Tenant Management</h1>
          </div>
          <div className="flex justify-between items-center sm:flex gap-30">
            <label className="input input-sm md:input-sm lg:input-md">
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                className="grow"
                placeholder="Search name..."
              />
            </label>
            <button
              className="btn btn-xs btn-primary sm:btn-sm md:btn-md "
              onClick={() => document.getElementById('addModal').showModal()}
            >
              <CirclePlus
                size={16}
                className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
              />
              <span className="sm:inline md:inline lg:inline">Add Tenant</span>
            </button>
          </div>
        </div>
        <dialog id="addModal" className="modal modal-middle sm:modal-middle">
          <div className="modal-box">
            <div className="flex items-center gap-2">
              <span className="bg-primary rounded-full px-2 py-2">
                <Plus color="#000" size={20} />
              </span>
              <h3 className="text-lg font-semibold">Create Tenant</h3>
            </div>
            <p className="py-4">Fill out the tenant information:</p>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
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
                  type="number"
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
                  onClick={clearCreateButtonWhenClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
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
              {tableSearchTenant.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-63 text-base-content/50"
                  >
                    Not found. Click “Add Tenant” to create one.
                  </td>
                </tr>
              ) : (
                <>
                  {tableSearchTenant.map((tenantData, index) => (
                    <tr key={index}>
                      <td className="font-semibold">{tenantData.firstName}</td>
                      <td className="font-semibold">{tenantData.lastName}</td>
                      <td className="font-semibold">
                        {tenantData.phoneNumber}
                      </td>
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
                </>
              )}
            </tbody>
          </table>
          <dialog id="editModal" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
              <div className="flex items-center gap-2">
                <span className="bg-accent rounded-full px-2 py-2">
                  <SquarePen color="#000" size={20} />
                </span>
                <h3 className="text-lg font-semibold">Update Tenant</h3>
              </div>
              <p className="py-4">Edit tenant information:</p>
              <form onSubmit={handleEditSubmit} className="space-y-4">
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
                    type="number"
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
              <div className="flex items-center gap-2">
                <span className="bg-error px-2 py-2 rounded-full">
                  <Trash2 color="#000" size={20} />
                </span>
                <h3 className="text-lg font-semibold">Delete Confirmation</h3>
              </div>
              <p className="py-4">Are you sure you want to delete this?</p>
              <div className="modal-action">
                <form onSubmit={handleDeleteSubmit}>
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
export default TenantPage;
