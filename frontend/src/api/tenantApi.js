const API_Tenant_URL = 'http://localhost:8080/api/tblTenant';

// get fetch
export const getAllTenants = async () => {
  const response = await fetch(API_Tenant_URL);
  return await response.json();
};

// create fetch
// confusing to na part saan galing (tenantData) na parameter?
export const createTenant = async (tenantData) => {
  const response = await fetch(API_Tenant_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tenantData),
  });

  return await response.json();
};

// update fetch
export const updateTenant = async (tenantData) => {
  const response = await fetch(API_Tenant_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tenantData),
  });
  return await response.json();
};

// delete fetch
export const deleteTenant = async (tenantID) => {
  const response = await fetch(`${API_Tenant_URL}/${tenantID}`, {
    method: 'DELETE',
  });
  return await response.json();
};
