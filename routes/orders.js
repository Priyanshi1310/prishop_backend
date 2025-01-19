/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The auto-generated id of the order
 *         orderItems:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/OrderItem'
 *         shippingAddress1:
 *          type: string
 *          description: Address of User
 *         shippingAddress2:
 *          type: string
 *          description: Address of User
 *         city:
 *          type: string
 *          description: User's City
 *         zip:
 *          type: string
 *          description: User's ZipCode
 *         country:
 *          type: string
 *          description: User's Country
 *         phone:
 *          type: string
 *          description: User's Phone Number
 *         status:
 *          type: string
 *          description: Status of Order
 *         totalPrice:
 *          type: number
 *          description: Total Price of Order
 *         user:
 *          type: string
 *          description: User Id
 *         dateOrdered:
 *          type: string
 *          formate: date-time
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the orderItem
 *         product:
 *            type: string
 *            description: Product Id
 *         quantity:
 *            type: integer
 *            description: Quantity of product  
 */
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order Managing API
 * /orders:
 *   get:
 *     summary: Get all Orders
 *     description: Retrieve a list of all orders, populated with user details and sorted by date.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *        '200':
 *          description: A list of orders
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Order'
 *        '401':
 *          description: Unauthorized User
 *        '500':
 *          description: Failed to retrieve orders
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                      type: boolean
 *                      example: false
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with associated order items.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Order'
 *     responses:
 *       '200':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Failed to create the order
 *       '401':
 *         description: Unauthorized User
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieve details of a specific order by its ID, including populated user and order item details.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order Details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Unauthorized User
 *       '500':
 *         description: Order not found
 *   put:
 *     summary: Update an order status
 *     tags: [Orders]
 *     description: Update the status of an order by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *          description: Order updated successfully
 *       '400':
 *          description: Failed to update the order
 *       '401':
 *          description: Unauthorized User
 *   delete:
 *      summary: Delete an order
 *      tags: [Orders]
 *      description: Delete an order by its ID and associated order items.
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The Id of the order to delete
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Order deleted successfully
 *        '401':
 *          description: Unauthorized User
 *        '404':
 *          description: Order not found
 *        '500':
 *          description: Server Error 
 * /orders/get/totalsales:
 *   get:
 *      summary: Get total sales
 *      description: Calculate the total sales from all orders.
 *      tags: [Orders]
 *      security:
 *       - bearerAuth: []  
 *      responses:
 *       '200':
 *         description: Total sales calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  totalsales:
 *                    type: number
 *      '400':
 *        description: Failed to generate total sales
 *      '401':
 *        description: Unauthorized
 * /orders/get/count:
 *   get:
 *     summary: Get total number of orders
 *     description: Retrieve the total number of orders in the system.
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: Order count retrieved successfully
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  orderCount:
 *                    type: integer
 *       '500':             
 *         description: Failed to retrieve order count
 * /orders/get/userorders/{userid}:
 *   get:
 *      summary: Get orders by user ID
 *      description: Retrieve all orders placed by a specific user, sorted by date.
 *      tags: [Orders]
 *      parameters:
 *        - name: userid
 *          in: path
 *          required: true
 *          description: The ID of the user to retrieve orders for.
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          descriptions: Orders retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Order'
 *        '500':
 *          description: Failed to retrieve user orders  
 */

const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();

//to get all orders
router.get(`/`, async (req, res) =>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})

//to get orders by id
router.get(`/:id`, async (req, res) =>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        });

    if(!order) {
        res.status(500).json({success: false})
    } 
    res.send(order);
})

//to create new order
router.post('/', async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();

    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
})

//to update/edit order status by id
router.put('/:id',async (req, res)=> {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order)
    return res.status(400).send('the order cannot be update!')

    res.send(order);
})

//to delete the order by id
router.delete('/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

//to get totalsales in amount
router.get('/get/totalsales', async (req, res)=> {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])

    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

//to get total count of orders
router.get(`/get/count`, async (req, res) =>{
    const countOrders = async () => {
        try {
          const orderCount = await Order.countDocuments({});
          if (!orderCount) {
            return res.status(500).json({ success: false });
          }
          return res.status(200).send({
            orderCount: orderCount,
          });
        } catch (error) {
            return res.status(404).json({success: false , message: error})
        }
      };
      
      countOrders();
})

router.get(`/get/userorders/:userid`, async (req, res) =>{
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);
})


module.exports = router;