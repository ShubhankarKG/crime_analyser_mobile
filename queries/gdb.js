const driver = require("../gdb");
const neo4j = require("neo4j-driver");

module.exports = {
  getData(req, res) {
    const { year } = req.query;
    let queryResult = {};
    console.log(year);
    const session = driver.session();
    session
      .run(
        "match (c:Crime)-[:OCCURED_IN{year: $year}]->(l:Location) return count(c) as count",
        { year: neo4j.int(year) }
      )
      .then((result) => {
        queryResult["result"] = result.records[0].get("count").toNumber();
        result.records.forEach((record) =>
          console.log(record.get("count").toNumber())
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        res.status(200).json(queryResult);
        session.close();
      });
  },

  getTableData(req, res) {
    const { location } = req.params;
    let queryResult = {};
    let arr = [];
    console.log(decodeURI(location));
    const session = driver.session();
    session
      .run(
        `match (cr:Crime)-[:OCCURED_IN]->(l:Location{location: $location}) return l.location as location, cr.AttemptToMurder as AttemptToMurder,  cr.Burglary as Burglary, cr.Cheating as Cheating, cr.Dowry as Dowry, cr.Hurt as Hurt, cr.KidnappingAndAbduction as KidnappingAndAbduction, cr.Murder as Murder, cr.Rape as Rape, cr.Riots as Riots, cr.Theft as Theft,
        (cr.AttemptToMurder+ cr.Burglary+ cr.Cheating+ cr.Dowry+ cr.Hurt+ cr.KidnappingAndAbduction + cr.Murder + cr.Rape + cr.Riots + cr.Theft) as total, 
        cr.year as year 
        order by total desc`,
        { location: decodeURI(location) }
      )
      .then((result) => {
        // queryResult["result"] = result.records[0].get("count").toNumber();

        result.records.forEach((record) => {
          let innerRecord = {};
          record.keys.forEach((key) => {
            innerRecord[key] = record.get(key);
            // console.log(key, " ", record.get(key));
          });
          arr.push(innerRecord);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        queryResult["result"] = arr;
        res.status(200).json(queryResult);
        session.close();
      });
  },
};
