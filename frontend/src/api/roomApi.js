const API_Room_URL = 'http://localhost:8080/api/tblRoom';
const API_Tenant_URL = 'http://localhost:8080/api/tblTenant';

// create
export const createRoom = async (roomData) => {
  const response = await fetch(API_Room_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData),
  });
  return await response.json();
};

// get
export const getAllRooms = async () => {
  const response = await fetch(API_Room_URL);
  return await response.json();
};

// selecttion for tenants
export const selectionTenants = async () => {
  const response = await fetch(API_Tenant_URL);
  return await response.json();
};

//edit
export const updateRoom = async (roomData) => {
  const response = await fetch(API_Room_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData),
  });
  return await response.json();
};
