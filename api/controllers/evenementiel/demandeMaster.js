const connexion = require('../../../db_connection');



module.exports.createDemandeMaster = (req, res) => {

    if (req.file) {
        const file = "http://localhost:3000/demande-master/" + req.file.filename;
        const data = req.body;
        connexion.query(
            "INSERT INTO demande_master(date_inscrit, id_etat_demande_master, id_master, id_etudiant, fichier) VALUES (?,?,?,?,?)",
            [data.date_inscrit, data.id_etat_demande_master, data.id_master, data.id_etudiant, file],
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
    } else {
        res.status(404).json({
            err: true,
            message: "file non existe",
        })
    }
};

module.exports.getListDemandeMaster = (req, res) => {

    connexion.query(
        "SELECT *, etablissement.libelle as libelleEtablissement, master.nom as nomMaster  FROM demande_master, master, etudiant, etablissement,departement,user,adresse WHERE demande_master.id_master = master.id_master and master.id_departement=departement.id_departement and master.id_etablissement=etablissement.id_etablissement and demande_master.id_etudiant = etudiant.id_etudiant and etudiant.id_user = user.id_user and adresse.id_user=user.id_user",
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

module.exports.getDemandeMasterById = (req, res) => {
    const id_demande = req.params.id;
    connexion.query(
        "SELECT *, etablissement.libelle as libelleEtablissement, master.nom as nomMaster  FROM demande_master, master, etudiant, etablissement,departement,user,adresse WHERE demande_master.id_master = master.id_master and master.id_departement=departement.id_departement and master.id_etablissement=etablissement.id_etablissement and demande_master.id_etudiant = etudiant.id_etudiant and etudiant.id_user = user.id_user and adresse.id_user=user.id_user AND demande_master.id_demande=?",
        [id_demande],
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

module.exports.updateDemandeMaster = (req, res) => {
    if (req.file) {
        const file = "http://localhost:3000/demande-master/" + req.file.filename;
        const data = req.body;
        connexion.query(
            "UPDATE demande_master SET date_inscrit=?,id_etat_demande_master=?,id_master=?,id_etudiant=?,fichier=? WHERE id_demande =?",
            [data.date_inscrit, data.id_etat_demande_master, data.id_master, data.id_etudiant, file, data.id_demande],
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

    } else {
        res.status(404).json({
            err: true,
            message: "file non existe",
        })
    }
};

module.exports.deleteDemandeMaster = (req, res) => {
    const id_demande = req.params.id;
    connexion.query(
        "DELETE FROM demande_master WHERE id_demande = ?",
        [id_demande],
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

