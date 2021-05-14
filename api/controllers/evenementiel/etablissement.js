const connexion = require('../../../db_connection');

module.exports.createEtablissement = (req, res) => {
    const data = req.body;
    connexion.query(
        "INSERT INTO etablissement(libelle, code_postale, rue, ville, gouvernorat_adresse, pays) VALUES (?, ?, ?, ?, ?, ?)",
        [data.libelle, data.code_postale, data.rue, data.ville, data.gouvernorat_adresse, data.pays],
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

module.exports.getListEtablissement = (req, res) => {

    connexion.query("SELECT * FROM etablissement",
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

module.exports.getEtablissementById = (req, res) => {
    const id_etablissement = req.params.id;
    connexion.query(
        "SELECT * FROM etablissement WHERE id_etablissement = ?",
        [id_etablissement],
            (err, results) => {

            if (err) {
                res.status(500).json({
                    err:true,
                    results:[]
                });
            }
            
            if(results.length>0)
                res.status(200).json({
                    err:false,
                    results:results,
                })
            else
                res.status(404).json({
                    err:false,
                    results:[],
                    message:"choix n'existe pas",
                }) 
        })
};

module.exports.updateEtablissement = (req, res) => {
    const data = req.body;
    connexion.query(
        "UPDATE etablissement SET libelle =?, code_postale =?, rue =?, ville = ?, gouvernorat_adresse = ?, pays = ? where id_etablissement = ?",
        [data.libelle, data.code_postale, data.rue, data.ville, data.gouvernorat_adresse, data.pays, null, data.id_etablissement],
            (err, results) => {
                if (err) {
                    res.status(500).json({
                        err:true,
                        results:[]
                    });
                }

            if(results.affectedRows>0)
                res.status(200).json({
                    err:false,
                    results:results.affectedRows,
                })
            else
                res.status(404).json({
                    err:true,
                    results:[],
                    message:"echec lors du stockage",
                }) 
        })
};

module.exports.deleteEtablissement = (req, res) => {
    const id_etablissement = req.params.id;
    connexion.query(
        "delete from etablissement where id_etablissement = ?",
        [id_etablissement],
        (err, results) => {
            if (err) {
                res.status(500).json({
                    err:true,
                    results:[]
                });
            }

            if(results.affectedRows>0)
                res.status(200).json({
                    err:false,
                    results:results.affectedRows,
                })
            else
                res.status(404).json({
                    err:true,
                    results:[],
                    message:"echec lors de suppression",
                }) 
        })
};


