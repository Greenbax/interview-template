const FormatVendorData = (rawData) =>
  // rawData follows the schema as in GET_VENDORS_QUERY on frontend/App.jsx
  rawData.map((data) => {
    const {
      name, description, link, ...otherKeys
    } = data;
    return {
      vendor: {
        name,
        description,
        link,
      },
      ...otherKeys,
    };
  });

export default FormatVendorData;
