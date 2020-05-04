var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET users listing. */
module.exports = (db) => {
  router.get('/', function (req, res, next) {
    let sql = `SELECT * FROM bread ORDER BY id LIMIT $1 OFFSET $2`;
    db.query(sql, [100, 0], (err, data) => {
      if (err) {
        return res.send(err);
      } else if (data.rows == 0) {
        return res.send(`data can not be found`);
      }
      else {
        res.status(200).json({
          data: data.rows
        });
      }
    });
  });

  router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    let sql = `SELECT * FROM bread WHERE id = ${id}`;
    db.query(sql,(err, data) => {
      if (err) {
        return res.send(err);
      } else if (data.rows == 0) {
        return res.send(`data can not be found`);
      }
      else {
        res.status(200).json({
          data: data.rows[0],
          moment
        });
      }
    });
  });

  router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `DELETE FROM bread WHERE id = $1`;
    db.query(sql, [id], (err) => {
      if (err) return res.status(500).json({
        error: true,
        message: err
      })
      res.status(201).json({
        message: "data berhasil dihapus"
      })
    })
  })

  router.put('/:id', (req, res) => {
    let sql = `UPDATE bread SET stringdata = $2, integerdata = $3, floatdata = $4, booleandata = $5, datedata = $6  WHERE id = $1`
    let edit = [parseInt(req.params.id), req.body.stringdata, parseInt(req.body.integerdata), parseFloat(req.body.floatdata), JSON.parse(req.body.booleandata), req.body.datedata];
    db.query(sql, edit, (err) => {
      if (err) return res.status(500).json({
        error: true,
        message: err
      })
      res.status(201).json({
        error : false,
        message: "data berhasil diganti"
      })
    })
  });

  router.post('/', function (req, res) {
    let sql = 'INSERT INTO bread (stringdata, integerdata, floatdata, booleandata, datedata) VALUES  ($1,$2,$3,$4,$5)';
    let add = [req.body.stringdata, parseInt(req.body.integerdata), parseFloat(req.body.floatdata), JSON.parse(req.body.booleandata), req.body.datedata];
    db.query(sql, add, (err) => {
      if (err) return res.status(500).json({
        error: true,
        message: err
      })
      res.status(201).json({
        error: false,
        message: 'data berhasil ditambahkan'
      })
    });
  });

return router;
}