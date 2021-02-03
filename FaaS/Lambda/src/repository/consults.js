exports.GET_ALL_COMPLIANCES_QUERY = "SELECT * FROM compliances;"
exports.INSERT_NEW_COMPLIANCE_QUERY =
  "INSERT INTO compliances " +
    "(name, description) " +
  "VALUES " +
    "($1, $2) RETURNING compliance_id;"
exports.INSERT_BATCH_STANDARD_QUERY =
  "INSERT INTO standards " +
    "(compliance, code, name, description, status) " +
  "VALUES ";
exports.GET_ALL_STANDARDS_BY_COMPLIANCE_ID =
  "SELECT * " +
  "FROM standards " +
  "WHERE compliance = $1;";

exports.getBatchStandardQuery = (compliance, standards) => {
  let values = ""

  standards.forEach(standard => {
    values += "('" +
      compliance + "', '" +
      standard.code + "', '" +
      standard.name + "', '" +
      standard.desc + "', '" +
      standard.status + "'),"
  })

  return (this.INSERT_BATCH_STANDARD_QUERY + values).replace(/.$/,";")
}