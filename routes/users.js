/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - passwordHash
 *         - phone
 *         - isAdmin
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: Email of the User
 *         password:
 *           type: string
 *           description: The password for user login
 *         phone:
 *           type: string
 *           description: User's phone number
 *         isAdmin:
 *           type: boolean
 *           description: User is admin or not (True or False)
 *         street:
 *           type: string
 *           description: User's Address
 *         apartment:
 *            type: string
 *            description: User's Address
 *         zip:
 *            type: string
 *            description: User's Zip Code
 *         city:
 *            type: string
 *            description: User's City
 *         country:
 *             type: string
 *             description: User's Country
 *     
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users managing API
 * /users:
 *   get:
 *     summary: Get All Users
 *     description: Retrieve a list of all users (excluding their password hash). 
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: The list of Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *          description: Some server error
 * /users/register:
 *   post:
 *      summary: Register a new User
 *      description: Create a new user account.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        description: Created user object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *        responses:
 *         200:
 *          description: User registered successfully
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *         400:
 *          description: Failed to register user 
 *         500:
 *          description: Some server error 
 * /users/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a JWT token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                  type: string
 *                  example: myPassword123 
 *     responses:
 *       '200':
 *          description: Login Successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    type: string
 *                    example: user@example.com
 *                  token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '404':
 *          description: The Username or password wrong
 * /users/{id}:
 *   get:
 *     summary: Get the User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found
 *   put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        description: Unauthorized User
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       401:
 *         description: Unauthorized User
 *       404:
 *         description: The user was not found
 */


const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found." });
  }
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    return res.status(400).send("The user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("password is wrong!");
  }
});

router.post('/register', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err})
    })
})

router.get(`/get/count`, async (req, res) => {
  //const userCount = await User.countDocuments((count) => count);

  const countUsers = async () => {
    try {
      const userCount = await User.countDocuments({});
      if (!userCount) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).send({
        userCount: userCount,
      });
    } catch (error) {
        return res.status(404).json({success: false , message: error})
    }
  };
  
  countUsers();
});

module.exports = router;
