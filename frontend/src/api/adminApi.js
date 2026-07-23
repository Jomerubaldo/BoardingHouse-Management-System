const API_Admin_URL = 'http://localhost:8080/api/admin';

export const adminAuth = async (data) => {
  const response = await fetch(API_Admin_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    console.log(`Server Error: ${response.status}`);
  }
  return resData;
};
