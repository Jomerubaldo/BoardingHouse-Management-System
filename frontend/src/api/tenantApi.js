const API_Tenant_URL = 'http://localhost:8080/api/tblTenant';

// get fetch
export const getAllTenants = async () => {
  const response = await fetch(API_Tenant_URL);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

// create fetch
// no need ma confused kung bakit may data parameter dito kasi sa handleCreateSubmit function to galing na data
export const createTenant = async (data) => {
  const response = await fetch(API_Tenant_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error(
      resData.message || `Server Error: ${response.status}`
    );
    error.code = resData.code;
    throw error;
  }
  return resData;
};

// update fetch
export const updateTenant = async (id, data) => {
  const response = await fetch(`${API_Tenant_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error(
      resData.message || `Server Error: ${response.status}`
    );
    error.code = resData.code;
    throw error;
  }
  return resData;
};

// delete fetch
export const deleteTenant = async (id) => {
  const response = await fetch(`${API_Tenant_URL}/${id}`, {
    method: 'DELETE',
  });
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error(
      resData.message || `Server Error: ${response.status}`
    );
    error.code = resData.code;
  }
  return resData;
};
