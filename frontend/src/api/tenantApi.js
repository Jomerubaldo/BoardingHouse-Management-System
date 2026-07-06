const API_Tenant_URL = 'http://localhost:8080/api/tblTenant';

// get fetch
export const getAllTenants = async () => {
  const response = await fetch(API_Tenant_URL);
  return await response.json();
};

// create fetch
// no need ma confused kung bakit may data parameter dito kasi sa handleCreateSubmit function to galing na data
export const createTenant = async (data) => {
  const response = await fetch(API_Tenant_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return await response.json();
};

// update fetch
export const updateTenant = async (id, data) => {
  const response = await fetch(`${API_Tenant_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await response.json();
};

// delete fetch
export const deleteTenant = async (id) => {
  const response = await fetch(`${API_Tenant_URL}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
