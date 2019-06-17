
const dbController = require('./db.controller')
var serviceError = {"Error" : "A service error occurred."};


// Retrieve and return all notes from the database.
module.exports.findAll = (req, res, tablename) => {
    dbController.getPagedData(req, tablename, cbReturnEmptyResponse.bind(this)).then((resp) => {
            if (typeof resp !== "undefined"){
                res.json(resp.rows)
            } else {
                res.status(500).json({serviceError});
            }
        }, (err) => { 
            res.status(500).json({serviceError});
    }).catch((err) => {
        console.error (err);
    });

}

function cbReturnEmptyResponse(){
    res.status(500).json({serviceError});
}

// Find a single note with a noteId
module.exports.findOne = (req, res, tablename, fieldname) => {
    dbController.getTableRecord(req, tablename, fieldname, cbReturnEmptyResponse.bind(this)).then((resp) => {
        if (typeof resp !== "undefined"){
            res.json(resp.rows)
        } else {
            res.status(500).json({serviceError});
        }
    }, (err) => { 
        res.status(500).json({serviceError});
    }).catch((err) => {
        console.error (err);
    });
}
