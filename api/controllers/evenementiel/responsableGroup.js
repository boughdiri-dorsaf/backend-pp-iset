const connexion = require('../../../db_connection');


module.exports.create = (req, res) => {
    const data = req.body;
    connexion.query(
        'INSERT INTO user( nom, prenom, email, password,age, cin, sexe, num_passport, date_naissance,id_role,reset_link) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [data.nom, data.prenom, data.email, data.password, data.age, data.cin, data.sexe, data.num_passport, data.date_naissance, data.id_role, null
        ],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    message: err.sqlMessage,
                });
            }

            if (results.affectedRows > 0) {
                createResponsableGroup(data, results.insertId)

                res.status(200).json({
                    err: false,
                    results: results,
                })
            } else {
                res.status(404).json({
                    err: true,
                    results: [],
                    message: "echec lors du stockage",
                })
            }
        }
    )
};


function createResponsableGroup(data, id_user) {
    connexion.query(
        "INSERT INTO responsable_group(qualite, id_user) VALUES (?, ?)",
        [data.qualite, id_user],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    message: err.sqlMessage,
                });
            }

            if (results.affectedRows > 0)
                res.status(200).json({
                    err: false,
                    results: results,
                })
            else
                res.status(404).json({
                    err: true,
                    results: [],
                    message: "echec lors du stockage",
                })
        }
    );
}

module.exports.getListResponsableGroup = (req, res) => {

    connexion.query("SELECT * FROM responsable_group,user WHERE responsable_group.id_user=user.id_user",
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    results: []
                });
            }

            if (results.length > 0)
                res.status(200).json({
                    err: false,
                    results: results,
                })
            else
                res.status(404).json({
                    err: false,
                    results: [],
                    message: "choix n'existe pas",
                })
        })
};

module.exports.getResponsableGroupById = (req, res) => {
    const id_responsable_group = req.params.id;
    connexion.query(
        "SELECT * FROM responsable_group,user WHERE responsable_group.id_user=user.id_user and id_responsable_group = ?",
        [id_responsable_group],
        (err, results) => {

            if (err) {
                res.status(500).json({
                    err: true,
                    results: []
                });
            }

            if (results.length > 0)
                res.status(200).json({
                    err: false,
                    results: results,
                })
            else
                res.status(404).json({
                    err: false,
                    results: [],
                    message: "choix n'existe pas",
                })
        })
};


function update(data, callBack) {
    connexion.query('Update user set email = ?, password = ?, id_role = ?, nom = ?, prenom = ?, age = ?, cin = ?, sexe = ?, num_passport = ?, date_naissance = ? where id_user = ?',
        [
            data.email,
            data.password,
            1,
            data.nom,
            data.prenom,
            data.age,
            data.cin,
            data.sexe,
            data.num_passport,
            data.date_naissance,
            data.id_user
        ], (err, res) => {
            if (err) throw err
            this.updateResponsableGroup(data, res.insertId, function () { })
            return callBack(null, res);
        }
    );
};

function updateResponsableGroup(data, id_user, callBack) {
    connexion.query(
        "UPDATE responsable_group SET qualite=?,id_user=? where id_responsable_group = ?",
        [data.qualite, id_user, data.id_responsable_group],
        (err, res) => {
            if (err) throw err;
            return callBack(null, res);
        }
    );
}

module.exports.deleteResponsableGroup = (req, res) => {
    const id_responsable_group = req.params.id;
    connexion.query(
        "DELETE FROM responsable_group where id_responsable_group = ?",
        [id_responsable_group],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    results: []
                });
            }

            if (results.affectedRows > 0)
                res.status(200).json({
                    err: false,
                    results: results.affectedRows,
                })
            else
                res.status(404).json({
                    err: true,
                    results: [],
                    message: "echec lors de suppression",
                })
        })
};

