const ConvertVendorsCsv = (data) => data.map((value) => {
  const {
    name, description, link, category, status, risk, tier,
  } = value;
  return [name, category, link, description, status, risk, tier];
});

export default ConvertVendorsCsv;
