function returnCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are 0-indexed
  const day = now.getDate();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // console.log(`Current Date: ${year}-${month}-${day}`);
  // console.log(`Current Time: ${hours}:${minutes}:${seconds}`);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default returnCurrentDateTime;
