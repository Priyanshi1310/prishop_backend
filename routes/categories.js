/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The auto-generated id of the category
 *         name:
 *          type: string
 *          description: Category Name
 *         icon:
 *          type: string
 *          description: Icon of Category
 *         color:
 *          type: string
 *          description: Color of the Category
 */
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category managing API
 * /categories:
 *    get:
 *      summary: Get all categories
 *      description: Retrieve a list of all categories
 *      tags: [Categories]
 *      responses:
 *         '200':
 *           description: A list of categories
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Category'
 *         '500':
 *           description: Failed to retrieve categories
 *           content:
 *             application/json:
 *               schema:
 *                type: object
 *                properties:
 *                  success:
 *                     type: boolean
 *                     example: false
 *    post:
 *      summary: Create a new category
 *      description: Add a new category to the database.
 *      tags: [Categories]
 *      security:
 *       - bearerAuth: []  
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Category'
 *      responses:
 *        '200':
 *          description: Category created successfully
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Category'
 *        '400':
 *          description: Failed to create the category
 *        '401':
 *          description: Unauthorized User
 * /categories/{id}:
 *    get:
 *      summary: Get a category by ID
 *      description: Retrieve details of a specific category by its ID.
 *      tags: [Categories]
 *      security:
 *       - bearerAuth: []  
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the category to retrieve.
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *           description: Category details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Category'
 *        '500':
 *           description: Category not found
 *           content:
 *             application/json:
 *               schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *    put:
 *      summary: Update a category by ID
 *      description: Update the details of a specific category by its ID.
 *      tags: [Categories]
 *      security:
 *       - bearerAuth: []  
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the category to update.
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      responses:
 *        '200':
 *          description: Category updated successfully
 *          content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Category'
 *        '400':
 *          description: Failed to update the category
 *        '401':
 *          description: Unauthorized User
 *    delete:
 *      summary: Delete a category by ID
 *      description: Remove a category from the database by its ID.
 *      tags: [Categories]
 *      security:
 *       - bearerAuth: []  
 *      parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the category to delete.
 *           schema:
 *             type: string
 *      responses:
 *        '200':
 *          description: Category deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                    type: string
 *                    example: The category is deleted!
 *        '400':
 *          description: Category not found
 *        '401':
 *          description: Unauthorized User
 *        '500':
 *          description: Server error while deleting the category
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  error:
 *                    type: string
 *                    example: "Error details"
 * 
 */

const {Category} = require('../models/category')
const express = require('express')
const router = express.Router();

//to get all categories
router.get(`/`, async(req,res) => {
    const categoryList = await Category.find()

    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList);
})

//to get category by id
router.get('/:id', async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
})

//to create new category
router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

//to edit category by id
router.put('/:id',async (req, res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true}
    )

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

//to delete category by id
router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports = router;