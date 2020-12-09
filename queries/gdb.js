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
    let queryResult = {};
    let arr = [];
    const session = driver.session();
    session
      .run(
        `match (cr:Crime)-[:OCCURED_IN{year: 2008}]->(l:Location) return l.location as location, cr.AttemptToMurder as AttemptToMurder,  cr.Burglary as Burglary, cr.Cheating as Cheating, cr.Dowry as Dowry, cr.Hurt as Hurt, cr.KidnappingAndAbduction as KidnappingAndAbduction, cr.Murder as Murder, cr.Rape as Rape, cr.Riots as Riots, cr.Theft as Theft,
        (cr.AttemptToMurder+ cr.Burglary+ cr.Cheating+ cr.Dowry+ cr.Hurt+ cr.KidnappingAndAbduction + cr.Murder + cr.Rape + cr.Riots + cr.Theft) as total, 
        cr.year as year 
        order by total desc
        limit 20`
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

  getCustomData(req, res) {
    const { location, year } = req.body;
    let queryResult = {};
    const session = driver.session();
    session
      .run(
        `match (cr:Crime)-[:OCCURED_IN{year: $year}]->(l:Location{location: $location}) return cr.AttemptToMurder as AttemptToMurder,  cr.Burglary as Burglary, cr.Cheating as Cheating, cr.Dowry as Dowry, cr.Hurt as Hurt, cr.KidnappingAndAbduction as KidnappingAndAbduction, cr.Murder as Murder, cr.Rape as Rape, cr.Riots as Riots, cr.Theft as Theft,
        (cr.AttemptToMurder+ cr.Burglary+ cr.Cheating+ cr.Dowry+ cr.Hurt+ cr.KidnappingAndAbduction + cr.Murder + cr.Rape + cr.Riots + cr.Theft) as total, 
        cr.year as year`,
        { year: neo4j.int(year), location }
      )
      .then((result) => {
        // queryResult["result"] = result.records[0].get("count").toNumber();

        result.records.forEach((record) => {
          record.keys.forEach((key) => {
            queryResult[key] = record.get(key)
          })
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        res.status(200).json(queryResult);
        session.close();
      });
  },
};
