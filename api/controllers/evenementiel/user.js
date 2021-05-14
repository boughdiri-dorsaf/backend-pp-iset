const connexion = require('../../../db_connection');


module.exports.getUsers = (req, res) => {

    connexion.query(`Select * from user`, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        return res.json({
            success: 1,
            data: results
        });
    })
};
module.exports.createDepartement = (req, res) => {
    const data = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    
    connexion.query(
        connexion.query('INSERT INTO `user`(`nom`, `prenom`,`email`, `password`, `age`, `cin`, `sexe`, `num_passport`, date_naissance,id_role, reset_link) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
            data.nom,
            data.prenom,
            data.email,
            data.password,
            data.age,
            data.cin,
            data.sexe,
            data.num_passport,
            data.date_naissance,
            data.id_role,
            null
        ],(err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: results
            });
        })
};

function create(data, callback) {
    connexion.query('INSERT INTO `user`(`nom`, `prenom`,`email`, `password`, `age`, `cin`, `sexe`, `num_passport`, date_naissance,id_role, reset_link) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
            data.nom,
            data.prenom,
            data.email,
            data.password,
            data.age,
            data.cin,
            data.sexe,
            data.num_passport,
            data.date_naissance,
            data.id_role,
            null
        ], (err, res) => {
            if (err) throw err
            this.createAdresse(data, res.insertId, function () { })
            return callback(null, res);


        })
}

    function createAdresse(data, id_user, callback) {
        connexion.query('INSERT INTO `adresse`( `code_postale`, `rue`, `ville`, `gouvernorat_adresse`, `pays`, `id_user`) VALUES (?,?,?,?,?,?)',
            [
                data.code_postale,
                data.rue,
                data.ville,
                data.gouvernorat_adresse,
                data.pays,
                id_user
            ],
            (err, res) => {
                if (err) throw err
                return callback(null, res);

            }
        )
    }

function getUserByUserId(id, callBack) {
    connexion.query(
        `select * from user, adresse where user.id_user = adresse.id_user and user.id_user=?`,
        [id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

module.exports.getUserByUserId = (req, res, next) => {
    const id = req.params.id;
    const sql = `select * from user, adresse where user.id_user = adresse.id_user and user.id_user=?`;

    client.query(sql, [id], (err, row, fields) => {
        if (!err) {
            if (row.length > 0)
                res.status(200).json({
                    err: false,
                    rows: row,
                })
            else
                res.status(404).json({
                    err: true,
                    rows: [],
                    message: "user non enregistre",
                })
        }
        else
            res.status(500).json({
                err: true,
                message: err.sqlMessage
            });
    })
};

function getAdresse(id_user, callBack) {
    connexion.query('select * from adresse where id_user = ?',
        [
            id_user
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
        }
    );
}

function updateUser(data, callBack) {
    connexion.query('Update `user` set `email` = ?, `password` = ?, `id_role` = ?, `nom` = ?, `prenom` = ?, `age` = ?, `cin` = ?, `sexe` = ?, `num_passport` = ?, `date_naissance` = ? where id_user = ?',
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
            this.updateAdresse(data, function () { })
            return callBack(null, res);
        }
    );
};

function updateAdresse(data, callback) {
    connexion.query('update `adresse`set `code_postale` = ?, `rue` = ?, `ville` = ?, `gouvernorat_adresse` = ?, `pays` = ? where `id_user` = ?',
        [
            data.code_postale,
            data.rue,
            data.ville,
            data.gouvernorat_adresse,
            data.pays,
            data.id_user
        ],
        (err, res) => {
            if (err) throw err
            return callback(null, res);

        }
    )
}

function getUserByUserEmail(email, callBack) {
    connexion.query(
        `select * from user where email = ? and id_role=1`,
        [email],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
};

function updateResetLinkUser(password, email, callBack) {
    connexion.query(
        'update user set reset_link =? where `email` = ?',
        [
            password,
            email
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

function getPasswordUser(resetLink, callBack) {
    connexion.query(
        'select password from user where reset_link = ?',
        [
            resetLink,
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

function updatePasswordUser(password, resetLink, callBack) {
    connexion.query(
        'update user set password = ? where reset_link = ?',
        [
            password,
            resetLink
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};


