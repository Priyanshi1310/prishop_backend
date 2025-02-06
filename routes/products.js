/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - countInStock
 *       properties:
 *         id:
 *          type: string
 *          description: The auto-generated id of the order
 *         name:
 *          type: string
 *          description: Name of the Product
 *         description:
 *          type: string
 *          description: Short description of product
 *         richDescription:
 *          type: string
 *          description: Details about Product
 *         brand:
 *          type: string
 *          description: Product Brand
 *         price:
 *          type: number
 *          description: Product Price
 *         category:
 *          type: string
 *          description: Product's Category
 *         countInStock:
 *          type: integer
 *          description: Number of products present in stock
 *         rating:
 *          type: number
 *          description: Rating given to product by customers
 *         numReviews:
 *          type: integer
 *          description: Total reviews of the Product 
 *         isFeatured:
 *          type: boolean
 *          description: Product is featured or not
 *         image:
 *          type: array
 *          items:
 *            type: string
 *            example: "http://localhost:3000/public/uploads/image-123456789.jpg"
 */
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Managing API
 * /products:
 *    get:
 *      summary: Get all products
 *      description: Retrieve a list of all products, optionally filtered by categories.
 *      tags: [Products]
 *      parameters:
 *        - name: categories
 *          in: query
 *          description: Comma-separated list of category IDs to filter the products.
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          descriptions: List of products
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 *        '500':
 *          description: Failed to retrieve products
 *    post:
 *      summary: Create a new product
 *      description: Create a new product with an uploaded image.
 *      tags: [Products]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                    type: string
 *                 richDescription:
 *                    type: string
 *                 brand:
 *                    type: string
 *                 price:
 *                    type: number
 *                 category:
 *                    type: string
 *                 countInStock:
 *                    type: integer
 *                 image:
 *                    type: string
 *                    format: binary
 *                    description: The main image of the product
 *                 isFeatured:
 *                     type: boolean
 *      responses:
 *        '200':
 *          description: Product created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        '400':
 *           description: Invalid category or missing image
 *        '401':
 *           description: Unauthorized User
 *        '500':
 *           description: Failed to create the product
 * /products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      description: Retrieve details of a specific product by its ID.
 *      tags: [Products]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the product to retrieve.
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *           description: Product detail
 *           content:
 *             application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Product'
 *        '500':
 *           description: Failed to retrieve the product
 *    put:
 *      summary: Update a product
 *      description: Update an existing product by its ID.
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the product to update.
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/Product'
 *      responses:
 *        '200':
 *          description: Product updated successfully
 *        '400':
 *          description: Invalid Product ID or Category
 *        '401':
 *          description: Unauthorized User
 *        '500':  
 *          description: Failed to update the product
 *    delete:
 *      summary: Delete a product
 *      description: Delete an existing product by its ID.
 *      tags: [Products]
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the product to delete.
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *           description: Product deleted successfully
 *        '404':
 *           description: Product not found
 *        '401':
 *           description: Unauthorized User
 *        '500':
 *           description: Server Error 
 * /products/get/count:
 *   get:
 *     summary: Get total number of products
 *     description: Retrieve the total number of products in the database.
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Product count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productCount:
 *                   type: integer
 *       '500':
 *         description: Failed to retrieve product count
 * /products/get/featured/{count}:
 *   get:
 *     summary: Get featured products
 *     description: Retrieve a list of featured products, limited by the count parameter.
 *     tags: [Products]
 *     parameters:
 *       - name: count
 *         in: path
 *         required: false
 *         description: Number of featured products to retrieve.
 *         schema:
 *           type: interger
 *     responses:
 *       '200':
 *         description: Featured products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *          description: Failed to retrieve featured products
 * /products/gallery-images/{id}:
 *   put:
 *     summary: Update product gallery images
 *     description: Upload and update the gallery images for a specific product.
 *     tags: [Products]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of images to upload (max 10)
 *     responses:
 *        '200':
 *          description: Gallery updated successfully
 *        '400':
 *          description: Invalid Product ID
 *        '401':
 *          description: Unauthorized User
 *        '500':
 *          description: Failed to update the gallery 
 */

const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const file = req.file;
  if(!file) return res.status(400).send('No image in the request')

  const fileName = file.filename
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,// "http://localhost:3000/public/upload/image-2323232"
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});

router.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
})

router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) => {
  //const userCount = await User.countDocuments((count) => count);

  const countProducts = async () => {
    try {
      const productCount = await Product.countDocuments({});
      if (!productCount) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).send({
        productCount: productCount,
      });
    } catch (error) {
        return res.status(404).json({success: false , message: error})
    }
  };
  
  countProducts();
});

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

router.put(
    '/gallery-images/:id', 
    uploadOptions.array('images', 10), 
    async (req, res)=> {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
         }
         const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }

         const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true}
        )

        if(!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    }
)


module.exports = router;
