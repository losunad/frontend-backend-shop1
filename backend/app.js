const express = require('express');
const cors = require('cors');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: ID товара
 *         name:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара
 *         stock:
 *           type: number
 *           description: Количество на складе
 */

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Internet Shop API',
            version: '1.0.0',
            description: 'API интернет-магазина техники',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Массив товаров
let products = [
    {
        id: 1,
        name: 'Игровая мышь X7',
        category: 'Периферия',
        description: 'Удобная игровая мышь',
        price: 1500,
        stock: 12
    },
    {
        id: 2,
        name: 'Механическая клавиатура K500',
        category: 'Периферия',
        description: 'Клавиатура с подсветкой',
        price: 3200,
        stock: 7
    }
];

// Главная страница
app.get('/', (req, res) => {
    res.send('Главная страница');
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Получить список товаров
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Список товаров
 */
app.get('/products', (req, res) => {
    res.json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Товар найден
 *       404:
 *         description: Товар не найден
 */
app.get('/products/:id', (req, res) => {
    const product = products.find(
        p => p.id == req.params.id
    );

    if (!product) {
        return res
            .status(404)
            .json({ error: 'Товар не найден' });
    }

    res.json(product);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Создать новый товар
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Товар создан
 */
app.post('/products', (req, res) => {
    const {
        name,
        category,
        description,
        price,
        stock
    } = req.body;

    const newProduct = {
        id: Date.now(),
        name,
        category,
        description,
        price,
        stock
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Обновить товар
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Товар обновлён
 *       404:
 *         description: Товар не найден
 */
app.patch('/products/:id', (req, res) => {
    const product = products.find(
        p => p.id == req.params.id
    );

    if (!product) {
        return res
            .status(404)
            .json({ error: 'Товар не найден' });
    }

    const {
        name,
        category,
        description,
        price,
        stock
    } = req.body;

    if (name !== undefined) product.name = name;
    if (category !== undefined)
        product.category = category;
    if (description !== undefined)
        product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;

    res.json(product);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Удалить товар
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Товар удалён
 *       404:
 *         description: Товар не найден
 */
app.delete('/products/:id', (req, res) => {
    const exists = products.some(
        p => p.id == req.params.id
    );

    if (!exists) {
        return res
            .status(404)
            .json({ error: 'Товар не найден' });
    }

    products = products.filter(
        p => p.id != req.params.id
    );

    res.json({
        message: 'Товар удалён'
    });
});

app.listen(port, () => {
    console.log(
        `Сервер запущен на http://localhost:${port}`
    );
});