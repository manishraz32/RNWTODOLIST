
export const convertDateTime = (dateString) => {
    const date = new Date(dateString);

  // Extract the components of the date
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();

  // Extract the components of the time
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  // Format the time in HH:MM:SS
  const time = `${hours}:${minutes}`;

  // Combine and return the formatted date and time
  return `${day}/${month}/${year} ${time}`;
}