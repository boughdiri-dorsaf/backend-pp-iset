const connexion = require('../../../db_connection');


module.exports.createEtudiant = (req, res) => {
    const data = req.body;
    connexion.query(
        "INSERT INTO etudiant(gouvern_naissance, situation, id_classe, id_departement, id_user) VALUES (?,?,?,?,?)",
        [data.gouvern_naissance, data.situation, data.id_classe, data.id_departement, data.id_user],
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
    )
};

module.exports.getListEtudiant = (req, res) => {

    connexion.query("SELECT * FROM etudiant,classe,departement,user,adresse WHERE etudiant.id_classe=classe.id_classe and etudiant.id_departement=departement.id_departement and etudiant.id_user=user.id_user and user.id_user=adresse.id_user",
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

module.exports.getEtudiantById = (req, res) => {
    const id_etudiant = req.params.id;
    connexion.query(
        "SELECT * FROM etudiant,classe,departement,user,adresse WHERE etudiant.id_classe=classe.id_classe and etudiant.id_departement=departement.id_departement and etudiant.id_user=user.id_user and user.id_user=adresse.id_user and etudiant.id_user=?",
        [id_etudiant],
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

module.exports.updateEtudiant = (req, res) => {
    const data = req.body;
    connexion.query(
        "UPDATE etudiant SET gouvern_naissance=?,situation=?,id_classe=?,id_departement=?,id_user=? WHERE id_etudiant =?",
        [data.gouvern_naissance, data.situation, data.id_classe, data.id_departement, data.id_user, data.id_etudiant],
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
                    message: "echec lors du stockage",
                })
        })
};

module.exports.deleteEtudiant = (req, res) => {
    const id_etudiant = req.params.id;
    connexion.query(
        "DELETE FROM etudiant WHERE id_etudiant=?",
        [id_etudiant],
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

