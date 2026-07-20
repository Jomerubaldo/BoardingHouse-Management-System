import { useEffect, useState } from 'react';
import {
  createTenant,
  getAllTenants,
  updateTenant,
  deleteTenant,
} from '../api/tenantApi';

export function useTenant() {
  // loading state
  // need ng true initial para sa isFetchLoading para hindi sumabay yung
  // Not found. Click “Add Tenant” to create one.
  // kasi initial value ng filteredTenants.length ay empty array []
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // fetch data tenats
  const [tenants, setTenants] = useState([]);

  const addTenant = async (data) => {
    setIsCreateLoading(true);
    try {
      const result = await createTenant(data);
      if (result.success) {
        await fetchViewTenants();
      }
      return result;
    } catch (err) {
      console.error(err);
      return {
        success: false,
        code: err.code,
        message:
          'Cannot connect to server. Please check you internet connection',
      };
    } finally {
      setIsCreateLoading(false);
    }
  };

  const fetchViewTenants = async () => {
    setIsFetchLoading(true);
    try {
      const result = await getAllTenants();
      setTenants(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchViewTenants();
  }, []);

  const editTenant = async (id, data) => {
    setIsUpdateLoading(true);
    try {
      const result = await updateTenant(id, data);
      if (result.success) {
        await fetchViewTenants();
      }
      return result;
    } catch (err) {
      console.error(err);
      return {
        success: false,
        code: err.code,
        message:
          'Cannot connect to server. Please check you internet connection',
      };
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const removeTenant = async (id) => {
    setIsDeleteLoading(true);
    try {
      const result = await deleteTenant(id);
      if (result.success) {
        await fetchViewTenants();
      }
      return result;
    } catch (err) {
      console.error(err);
      return {
        success: false,
        code: err.code,
        message:
          'Cannot connect to server. Please check you internet connection',
      };
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return {
    tenants,
    addTenant,
    editTenant,
    removeTenant,
    isCreateLoading,
    isFetchLoading,
    isUpdateLoading,
    isDeleteLoading,
  };
}
