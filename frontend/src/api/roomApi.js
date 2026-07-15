const API_Room_URL = 'http://localhost:8080/api/tblRoom';
const API_Tenant_URL = 'http://localhost:8080/api/tblTenant';

// create
export const createRoom = async (roomData) => {
  const response = await fetch(API_Room_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData),
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

// get
export const getAllRooms = async () => {
  const response = await fetch(API_Room_URL);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(`Server Error ${response.status}`);
  }
  return resData;
};

// selecttion for tenants
export const selectionTenants = async () => {
  const response = await fetch(API_Tenant_URL);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

// edit room status
export const updateStatusRoom = async (id, data) => {
  const response = await fetch(`${API_Room_URL}/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

//edit
// dito marereference ang id at body/data mula sa function roomPage
export const updateRoom = async (id, data) => {
  const response = await fetch(`${API_Room_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

// delete
export const deleteRoom = async (id) => {
  const response = await fetch(`${API_Room_URL}/${id}`, {
    method: 'DELETE',
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

// totalRoom dashboard
export const totalRoom = async () => {
  const response = await fetch(`${API_Room_URL}/total-room`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

// totalRepairRoom
export const totalRepairRoom = async () => {
  const response = await fetch(`${API_Room_URL}/totalRepairingRoom`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};
