let connexion = require("../config/db");

class Specialite {
    constructor(row) {
        this.row = row;
    }

    static createSpecialite(data, callBack) {
        connexion.query(
            "INSERT INTO `specialite`(`libelle`, id_domaine) VALUES (?,?)",
            [data.libelle, data.id_domaine],
            (err, res) => {
                if (err) throw err;
                return callBack(null, res);
            }
        );
    }

    static getListSpecialite(callBack) {
        connexion.query("SELECT domaine.id_domaine,domaine.libelle as 'libelled',specialite.id_specialite,specialite.libelle as 'libelles'  FROM specialite,domaine where domaine.id_domaine=specialite.id_domaine",
            (err, res) => {
                if (err) throw err;
                callBack(res.map((row) => new Specialite(row)))
            });
    }

    static getSpecialiteById(id_specialite, callBack) {
        connexion.query(
            "SELECT * FROM `specialite` where id_specialite = ?",
            [id_specialite],
            (err, res) => {
                if (err) throw err;
                return callBack(null, res);
            }
        );
    }

    static updateSpecialite(data, callBack) {
        connexion.query(
            "UPDATE `specialite` SET `libelle`=? where id_specialite = ?",
            [data.libelle, data.id_specialite],
            (err, res) => {
                if (err) throw err;
                return callBack(null, res);
            }
        );
    }

    static deleteSpecialite(id, callBack) {
        connexion.query(
            "DELETE FROM `specialite` where id_specialite = ?",
            [id],
            (err, res) => {
                if (err) throw err;
                return callBack(null, res);
            }
        );
    }
}

module.exports = Specialite;