const express = require("express");
const createError = require("http-errors");

const Fighters = require("../models/Fighter");

const validator = require("../validation/fighters");

const router = express.Router();

// CREATE FIGHTER
router.post("/fighter", validator.createFighterValidation, (req, res, next) => {
  const { body } = req;

  Fighters.findOne({ name: body.name })
    .then(fighter => {
      if (fighter) {
        throw createError(
          400,
          `Fighter with name ${body.name} is allready exist`
        );
      }
      return Fighters.create(body);
    })
    .then(fighter => {
      if (!fighter) {
        throw createError(500, "Database error");
      }

      res.status(200).json({
        success: true,
        message: "Fighter was created successfully",
        fighter
      });
    })
    .catch(err => {
      next(err);
    });
});

// GET ALL FIGHTERS
router.get("/fighters", (req, res, next) => {
  Fighters.find({})
    .select({ _id: 1, name: 1, source: 1 })
    .then(fighters => {
      if (!fighters) {
        throw createError(500, "Database error");
      }

      res.status(200).json(fighters);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/fighter/:id", validator.checkId, (req, res, next) => {
  const { id } = req.params;

  Fighters.findById(id)
    .then(fighter => {
      if (!fighter) {
        throw createError(404, "Fighter not found.");
      }

      res.status(200).json(fighter);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
