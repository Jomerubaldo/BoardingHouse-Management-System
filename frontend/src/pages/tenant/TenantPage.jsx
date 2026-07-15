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

  // modal variable
  const addModal = document.getElementById('addModal');
  const editModal = document.getElementById('editModal');
  const deleteModal = document.getElementById('deleteModal');

  // phone validation
  const [addPhoneError, setAddPhoneError] = useState('');
  const [editPhoneError, setEditPhoneError] = useState('');

  const [deleteTenantData, setDeleteTenantData] = useState(null);
  // search filter in tablelist
  const [search, setSearch] = useState('');

  // handles submit
  const [createFormData, setCreateFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  // para makapag add mag oopen ng modal add tapos check kung full na or hindi
  const handleCreateClick = (e) => {
    e.preventDefault();

    if (tenants.length < 8) {
      addModal.showModal();
    } else {
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'Room is full. Unable to add tenant.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
    }
  };

  // para sa pag kuha ng e cre-create na value
  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });

    // phone number must 11 digits
    if (e.target.name === 'phoneNumber' && e.target.value.length >= 11) {
      setAddPhoneError('');
    }
  };

  // submit create form
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    // check phone number length
    if (createFormData.phoneNumber.length < 11) {
      setAddPhoneError('Please enter a valid 11-digit contact number.');
      return;
    }
    setAddPhoneError('');

    const result = await addTenant(createFormData);

    if (result.success) {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Tenant added successfully.',
        showConfirmButton: false,
        timer: 1000,
      });
      setCreateFormData({ firstName: '', lastName: '', phoneNumber: '' });
      addModal.close();
    }
    // check existing phone number in db
    else if (result.code === 'ER_DUP_ENTRY') {
      addModal.close();
      await Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'This contact number is already in use.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
      addModal.showModal();
    } else {
      console.error('Something went wrong:', result.message);
      addModal.close();
      await Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Unable to add tenant. Please check your connection and try again.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
      addModal.showModal();
    }
  };

  // reset value when close button add modal
  const clearCreateButtonWhenClose = (e) => {
    e.preventDefault();
    setCreateFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
    });
    addModal.close();
  };

  // kapag nag click ng specific na edit sa btn tablelist makukuha ang existing data
  const handleEditClick = (tenant) => {
    setEditFormData({
      tenantID: tenant.tenantID,
      firstName: tenant.firstName,
      lastName: tenant.lastName,
      phoneNumber: tenant.phoneNumber,
    });
    editModal.showModal();
  };

  // para sa pagkuha ng bagong na edit na value
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

    // edit contact number validation checking
    if (e.target.name === 'phoneNumber' && e.target.value.length >= 11) {
      setEditPhoneError('');
    }
  };

  // submit update form
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (editFormData.phoneNumber.length < 11) {
      setEditPhoneError('Please enter a valid 11-digit contact number.');
      return;
    }
    setEditPhoneError('');

    const result = await editTenant(editFormData.tenantID, editFormData);

    if (result.success) {
      editModal.close();
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Tenant information updated successfully.',
        showConfirmButton: false,
        timer: 1000,
      });
    } // check existing phone number in db
    else if (result.code === 'ER_DUP_ENTRY') {
      editModal.close();
      await Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'This contact number is already in use.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
      editModal.showModal();
    } else {
      editModal.close();
      console.error('Something went wrong:', result.message);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Unable to update tenant. Please check your connection and try again.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
      editModal.showModal();
    }
  };

  // para kapag na click alam yung tenantID na e dedelete sa db
  const handleDeleteClick = (tenant) => {
    setDeleteTenantData(tenant);
    deleteModal.showModal();
  };

  // submit delete form
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const result = await removeTenant(deleteTenantData.tenantID);

    if (result.success) {
      deleteModal.close();
      Swal.fire({
        title: 'Deleted!',
        icon: 'success',
        text: 'Tenant deleted successfully.',
        timer: 1000,
        showConfirmButton: false,
      });
    } //check existing user roompage
    else if (result.code === 'ER_ROW_IS_REFERENCED_2') {
      deleteModal.close();
      await Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'This tenant is currently assigned to a room and cannot be deleted.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
    } else {
      console.error('Something went wrong:', result.message);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Unable to delete tenant. Please check your connection and try again.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
    }
  };

  // for searching filter tenant in tablelist
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
              className="btn border-none shadow-none btn-xs hover:bg-black bg-[#2C3038] sm:btn-sm md:btn-md"
              onClick={handleCreateClick}
            >
              <CirclePlus
                size={16}
                className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
              />
              <span className="sm:inline md:inline lg:inline text-[#FFFFFF] font-bold">
                Register Tenant
              </span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-133.75 rounded">
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
          addPhoneError={addPhoneError}
        />
        <EditTenantModal
          handleEditSubmit={handleEditSubmit}
          editFormData={editFormData}
          handleEditChange={handleEditChange}
          isUpdateLoading={isUpdateLoading}
          editPhoneError={editPhoneError}
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
