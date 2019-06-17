
const pg = require('pg');
const DB_USER = process.env.DB_USER;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_HOST = process.env.DB_HOST;
const conString = "postgres://" + DB_USER + ":@" + DB_HOST + ":" + DB_PORT + "/" + DB_DATABASE;

module.exports.getTableRecord = (req, tablename, fieldname, cbNoResult) => {
    var client = getClient(conString, cbNoResult);
    sql = 'SELECT * FROM ' + tablename + ' WHERE ' + fieldname + ' = ' + req.params.id;
    return runQuery(sql, client).catch(err => {
      console.error (err);
      client.end();
    });
};


module.exports.getPagedData =  (req, tablename, cbNoResult) => {

    var client = getClient(conString, cbNoResult);

    var page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    var limit = parseInt(req.query.limit, 10);
    if (isNaN(limit)) {
      limit = 10;
    } else if (limit > 50) {
      limit = 50;
    } else if (limit < 1) {
      limit = 1;
    }

    var sql = 'SELECT count(1) FROM ' + tablename;
    var count = 0;
    var offset = 0;
    runQuery(sql, client).then((res) => {
        count = parseInt(res.rows[0].count, 10);
        offset = (page - 1) * limit;
      }).catch(err => {
        console.error(err);
        client.end();
      });

    sql = 'SELECT * FROM ' + tablename + ' OFFSET $1 LIMIT $2';
    return runQuery(sql, client, [offset, limit]).catch(err => {
      console.error (err);
      client.end();
    });
  }

function runQuery (sql, client, options){

    if (options){
      return new Promise((resolve, reject) => {
        client.query(sql, options). then ((res) => { 
            resolve(res);
          }).catch((err) => {
            reject (err);        
          }
        );
      });
    } else{
      return new Promise((resolve, reject) => {
        client.query(sql). then ((res) => {   
            resolve(res);
          }).catch((err) => {
            reject (err);
          }
        );
      });
    }
  }

  function getClient(conString, cbNoResult){
    var client = new pg.Client(conString);

    client.connect((err) => {
      if (err) {
        console.error('connection error', err);
        client.end();
        cbNoResult();
      }
     });
     return client;
  }
