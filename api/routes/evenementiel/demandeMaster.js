const express = require("express");
const router = express.Router();
const demandeMasterController=require('../../controllers/evenementiel/demandeMaster')

//Storage file in database -------------
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './demande-master/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'application/pdf'){
    cb(null, true);
  }else {
    cb(new Error("Extension de fichier non pdf"), false);
  }
}
const upload = multer({
  storage: storage, 
  limits: {
  fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
//------------------------------
router.post("/", upload.single('fichier'), demandeMasterController.createDemandeMaster);

router.get("/", demandeMasterController.getListDemandeMaster);

router.get("/:id", demandeMasterController.getDemandeMasterById);

router.patch("/", upload.single('fichier'),  demandeMasterController.updateDemandeMaster);

router.delete("/:id", demandeMasterController.deleteDemandeMaster);

module.exports = router;
 