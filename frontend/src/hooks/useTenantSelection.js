import { useState, useEffect } from 'react';
import { selectionTenants } from '../api/roomApi';

export function useTenantSelection() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenantSelection = async () => {
      try {
        const result = await selectionTenants();
        setTenants(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTenantSelection();
  }, []);

  return { tenants };
}