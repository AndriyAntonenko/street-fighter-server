const express = require("express");
const createError = require("http-errors");

const User = require("../models/User");

const validator = require("../validation/users");

const router = express.Router();

// CREATE USER
router.post("/user", validator.createUserValidation, (req, res, next) => {
  const { body } = req;
  User.findOne({ email: body.email })
    .select({ createdAt: 0, updatedAt: 0 })
    .then(user => {
      if (user) {
        throw createError(400, "User with such email is already exist!");
      }
      return User.create(body);
    })
    .then(user => {
      if (!user) {
        throw createError(500, "Database error");
      }

      res.status(200).json({
        success: true,
        message: "User was create successfull",
        user
      });
    })
    .catch(err => {
      next(err);
    });
});

// GET USER BY ID
router.get("/user/:id", validator.checkId, (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .select({ createdAt: 0, updatedAt: 0 })
    .then(user => {
      if (!user) {
        throw createError(404, `User with id ${id} not found`);
      }

      res.status(200).json({
        success: true,
        message: "Success",
        user
      });
    })
    .catch(err => {
      next(err);
    });
});

// UPDATE USER BY ID
router.put(
  "/user/:id",
  validator.renameUserByIdValidation,
  (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    User.find({ email: body.email })
      .then(user => {
        if (user) {
          throw createError(403, `User with ${body.email} email already exist`);
        }
        return User.findByIdAndUpdate(id, body, { new: true }).select({
          createdAt: 0,
          updatedAt: 0
        });
      })
      .then(user => {
        if (!user) {
          throw createError(404, `User with id ${id} not found`);
        }

        res.status(200).json({
          success: true,
          message: "Update successful",
          user
        });
      })
      .catch(err => {
        next(err);
      });
  }
);

// DELETE USER BY ID
router.delete("/user/:id", validator.checkId, (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .select({ createdAt: 0, updatedAt: 0 })
    .then(user => {
      if (!user) {
        throw createError(404, `User with id ${id} not found`);
      }

      res.status(200).json({
        success: true,
        message: "User was deleted successfull",
        user
      });
    })
    .catch(err => {
      next(err);
    });
});

// GET ALL USERS
router.get("/users", (req, res, next) => {
  User.find({})
    .select({ createdAt: 0, updatedAt: 0 })
    .then(users => {
      if (!users) {
        throw createError(500, "Database error");
      }

      res.status(200).json({
        success: true,
        message: "Success",
        users
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
