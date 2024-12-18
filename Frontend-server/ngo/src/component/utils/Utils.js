export const getHeaders = (data) => {
  if (!data || data.length === 0) return [];
  
  const headers = Object.keys(data[0]);
  const formattedHeaders = headers.map((header) =>
    header.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

  return formattedHeaders;
};
