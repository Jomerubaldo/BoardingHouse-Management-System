import { useEffect, useState } from 'react';
import {
  getAllTenants,
  updateTenant,
  deleteTenant,
  createTenant,
} from '../../api/tenantApi.js';

import { CirclePlus } from 'lucide-react';
import AddTenantModal from './components/AddTenantModal.jsx';
import EditTenantModal from './components/EditTenantModal.jsx';
import DeleteTenantModal from './components/DeleteTenantModal.jsx';
import TenantTable from './components/TenantTable.jsx';
import TenantSearchFilter from './components/TenantSearchFilter.jsx';

function TenantPage() {
  const [getTenantsData, setGetTenantsData] = useState([]); // gamitin nalang to kapag mag search filter same lang naman sila ng purpose
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [deleteTenantData, setDeleteTenantData] = useState(null);
  // for search filter in tablelist
  const [search, setSearch] = useState('');

  const [createFormData, setCreateFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

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
    <div className="@container px-5 h-auto">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className=" sm:text-md md:text-lg lg:text-lg xl:text-2xl">
            <h1 className="font-bold text-[#404244] text-3xl">
              Tenant Management
            </h1>
          </div>
          <div className="flex justify-between items-center sm:flex gap-30">
            <TenantSearchFilter search={search} setSearch={setSearch} />
            <button
              className="btn btn-xs bg-[#2C3038] sm:btn-sm md:btn-md"
              onClick={() => {
                getTenantsData.length < 8
                  ? document.getElementById('addModal').showModal()
                  : alert('Sorry, Cannot add tenant, Room is Full!');
              }}
            >
              <CirclePlus
                size={16}
                className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
              />
              <span className="sm:inline md:inline lg:inline text-[#FFFFFF] font-bold">
                Add Tenant
              </span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-133.75 rounded-box border border-base-content/20 bg-[#F4F4F5]">
          <TenantTable
            tableSearchTenant={tableSearchTenant}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
        <AddTenantModal
          handleCreateSubmit={handleCreateSubmit}
          createFormData={createFormData}
          handleCreateChange={handleCreateChange}
          clearCreateButtonWhenClose={clearCreateButtonWhenClose}
        />
        <EditTenantModal
          handleEditSubmit={handleEditSubmit}
          editFormData={editFormData}
          handleEditChange={handleEditChange}
        />
        <DeleteTenantModal handleDeleteSubmit={handleDeleteSubmit} />
      </div>
    </div>
  );
}
export default TenantPage;
