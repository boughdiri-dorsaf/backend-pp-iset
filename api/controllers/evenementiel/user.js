const connexion = require('../../../db_connection');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox8cbfcafa2ff54adfabcbdba4ce193360.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN })

module.exports.getUsers = (req, res) => {

    connexion.query('Select * from user, adresse where user.id_user= adresse.id_user',
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
        }
    )
};

module.exports.create = (req, res) => {
    const data = req.body;
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    connexion.query('INSERT INTO user(nom, prenom,email, password, age, cin, sexe, num_passport, date_naissance,id_role,gouvern_naissance) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
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
            2,
            data.gouvern_naissance
        ],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    message: err.sqlMessage,
                });
            }

            if (results.affectedRows > 0) {
                createAdresse(data, results.insertId);

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

function createAdresse(data, id_user) {
    connexion.query('INSERT INTO adresse( code_postale, rue, ville, gouvernorat_adresse, pays, id_user) VALUES (?,?,?,?,?,?)',
        [
            data.code_postale,
            data.rue,
            data.ville,
            data.gouvernorat_adresse,
            data.pays,
            id_user
        ]
    );
}

module.exports.getUserByUserId = (req, res, next) => {
    const id_user = req.params.id;
    const sql = 'select * from user, adresse where user.id_user = adresse.id_user and user.id_user=?';

    connexion.query(sql, [id_user], (err, row, fields) => {
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

module.exports.updateUser = (req, res) => {
    const data = req.body;
    const salt = bcrypt.genSaltSync(10);
    console.log(req)
    data.password = bcrypt.hashSync(data.password, salt);
    connexion.query(
        'Update user set email = ?, password = ?, id_role = 2, nom = ?, prenom = ?, age = ?, cin = ?, sexe = ?, num_passport = ?, date_naissance = ?, gouvern_naissance=? where id_user = ?',
        [
            data.email,
            data.password,
            data.nom,
            data.prenom,
            data.age,
            data.cin,
            data.sexe,
            data.num_passport,
            data.date_naissance,
            data.gouvern_naissance,
            data.id_user
        ], (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    results: err
                });
            }

            if (results.affectedRows > 0) {
                updateAdresse(data)
                res.status(200).json({
                    err: false,
                    results: results.affectedRows,
                })
            } else {
                res.status(404).json({
                    err: true,
                    results: err,
                    message: "echec lors du stockage",
                })
            }
        })
};

function updateAdresse(data) {
    connexion.query('update adresse set code_postale = ?, rue = ?, ville = ?, gouvernorat_adresse = ?, pays = ? where id_user = ?',
        [
            data.code_postale,
            data.rue,
            data.ville,
            data.gouvernorat_adresse,
            data.pays,
            data.id_user
        ]
    )
}

module.exports.getUserByUserEmail = (req, res) => {
    const body = req.body;
    connexion.query(
        'select * from user where email = ? and id_role=2',
        [body.email],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    results: []
                });
            }

            if (results.length > 0) {
                const result = bcrypt.compareSync(body.password, results[0].password);
                console.log(result)
                if (result) {
                    results.password = undefined;
                    const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });

                    res.status(200).json({
                        err: false,
                        message: "login successfully",
                        token: jsontoken,
                        id_user: results[0].id_user,
                    })
                } else {
                    res.status(404).json({
                        err: false,
                        message: "Invalidpassword",
                    })
                }

            } else {
                res.status(404).json({
                    err: false,
                    message: "User with this mail does not exist",
                })
            }
        })
};

module.exports.forgotPassword = (req, res) => {
    const body = req.body;
    connexion.query(
        'select * from user where email = ? and id_role=2',
        [body.email],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err: true,
                    results: []
                });
            }

            if (results.length > 0) {
                const token = jwt.sign({ _id: results._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });
                const data = {
                    from: 'noreply@bdorsaf.com',
                    to: body.email,
                    subject: 'account reset password link',
                    html: `
                        <h2>Please click on given link to reset your password</h2>
                        <p>${process.env.CLIENT_URL}/users/resetpassword/${token}</p>      
                    `
                };
                mg.messages().send(data, function (error, body) {
                    if (error) {
                      res.status(500).json({
                        err: false,
                        Token: error.message,
                    })
                    } else {
                      res.status(200).json({
                        success: 1,
                        message: "Email has been sent, kindly follow the instruction"
                      })
                    }
                  });

                  res.status(200).json({
                    err: false,
                    Token: token,
                })

            } else {
                res.status(404).json({
                    err: false,
                    message: "User with this mail does not exist",
                })
            }
        })
};

module.exports.resetPassword = (req, res) => {
    const body = req.body;
    if (body.resetLink) {
        jwt.verify(body.resetLink, process.env.RESET_PASSWORD_KEY, (err, results) => {
            if (err) {
              return res.status(401).json({
                success: 0,
                data: "Incorrect token or it is expired"
              });
            }
            const salt = bcrypt.genSaltSync(10);
            body.newPassword = bcrypt.hashSync(body.newPassword, salt);
            updatePasswordUser(body.newPassword, body.email)
            return res.status(200).json({
                success: 1,
                data: "Your password has been changed"
              });
        });
    }else {
        return res.status(401).json({
          success: 0,
          data: "Authentication error"
        });
      }

};


function updatePasswordUser(password, email) {
    connexion.query(
        'update user set password = ? where email = ?',
        [
            password,
            email
        ]
    );
};


