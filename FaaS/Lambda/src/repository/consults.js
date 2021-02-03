exports.GET_ALL_COMPLIANCES_QUERY = "SELECT * FROM compliances;"
exports.INSERT_NEW_COMPLIANCE_QUERY =
  "INSERT INTO compliances " +
    "(name, description) " +
  "VALUES " +
    "($1, $2);"
exports.INSERT_BATCH_COMPLIANCE_QUERY =
  "INSERT INTO compliances " +
    "(name, description) " +
  "VALUES ";

exports.getBatchComplianceQuery = (compliances) => {
  let values = ""

  compliances.forEach(compliance => {
    values += "('" +
      compliance.data.name + "', '" +
      compliance.data.desc + "'),"
  });
  
  return (this.INSERT_BATCH_COMPLIANCE_QUERY + values).replace(/.$/,";")
}