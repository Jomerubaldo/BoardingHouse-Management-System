import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import AddTenantModal from './components/AddTenantModal.jsx';
import EditTenantModal from './components/EditTenantModal.jsx';
import DeleteTenantModal from './components/DeleteTenantModal.jsx';
import TenantTable from './components/TenantTable.jsx';
import TenantSearchFilter from './components/TenantSearchFilter.jsx';
import { useTenant } from '../../hooks/useTenant.js';
import Swal from 'sweetalert2';

function TenantPage() {
  // useTenant
  const {
    tenants,
    addTenant,
    editTenant,
    removeTenant,
    isCreateLoading,
    isFetchLoading,
    isUpdateLoading,
    isDeleteLoading,
  } = useTenant();

  // handles
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [deleteTenantData, setDeleteTenantData] = useState(null);
  const [createFormData, setCreateFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  // for search filter in tablelist
  const [search, setSearch] = useState('');

  // para sa pag kuha ng e cre-create na value
  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const result = await addTenant(createFormData);
    if (result.success) {
      setCreateFormData({ firstName: '', lastName: '', phoneNumber: '' });
      document.getElementById('addModal').close();
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Added Successfully!',
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      document.getElementById('addModal').close();
      setCreateFormData({ firstName: '', lastName: '', phoneNumber: '' });
      console.error('Something went wrong:' + result.message);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Cannot connect to server. Please check you internet connection!',
        showConfirmButton: true,
      });
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

    const result = await editTenant(editFormData.tenantID, editFormData);
    if (result.success) {
      document.getElementById('editModal').close();
    } else {
      console.error('Something went wrong:' + result.message);
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

    const result = await removeTenant(deleteTenantData.tenantID);

    if (result.success) {
      document.getElementById('deleteModal').close();
    } else {
      console.error('Something went wrong:' + result.message);
    }
  };

  // for searching filter tenant in tablelist
  // confusing na part dito
  const filteredTenants = tenants.filter((tenant) =>
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
              className="btn border-none shadow-none btn-xs bg-[#2C3038] sm:btn-sm md:btn-md"
              onClick={() => {
                tenants.length < 8
                  ? document.getElementById('addModal').showModal()
                  : Swal.fire({
                      title: 'Warning',
                      icon: 'warning',
                      text: 'Sorry, Cannot add tenant, Room is Full!',
                      showConfirmButton: true,
                    });
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
        <div className="overflow-x-auto overflow-y-auto max-h-133.75 rounded-box border border-base-content/20 bg-[#Fff]">
          <TenantTable
            filteredTenants={filteredTenants}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            isFetchLoading={isFetchLoading}
          />
        </div>
        <AddTenantModal
          handleCreateSubmit={handleCreateSubmit}
          createFormData={createFormData}
          handleCreateChange={handleCreateChange}
          clearCreateButtonWhenClose={clearCreateButtonWhenClose}
          isCreateLoading={isCreateLoading}
          tenants={tenants}
        />
        <EditTenantModal
          handleEditSubmit={handleEditSubmit}
          editFormData={editFormData}
          handleEditChange={handleEditChange}
          isUpdateLoading={isUpdateLoading}
        />
        <DeleteTenantModal
          handleDeleteSubmit={handleDeleteSubmit}
          isDeleteLoading={isDeleteLoading}
        />
      </div>
    </div>
  );
}
export default TenantPage;
