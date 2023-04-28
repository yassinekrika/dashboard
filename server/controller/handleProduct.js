import connection from "../model/db.js"

// getProduct
export const getProduct = async (req, res) => {
    const query = `SELECT * FROM products`
    connection.query(query, (err, rows) => {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.json(rows)
        }
    })
}

// createProduct
export async function createProduct (req, res) {
    
    const query = `INSERT INTO products (product_id, 
        product_name, 
        product_category, 
        product_price, 
        product_qty, 
        product_description, 
        product_img) VALUES (NULL, 
        '${req.body.product_name}', 
        '${req.body.product_category}', 
        ${req.body.product_price}, 
        ${req.body.product_qty}, 
        '${req.body.product_description}', 
        '${req.body.product_img}')`

    connection.query(query, (err) => {
            if (err) {
                res.status(500).send({ message: err.message })
            } else {
                res.send({message: 'product created'})
            }
    })

}

// deleteProduct
export const deleteProduct = async (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM products WHERE products.product_id = ${id}`
    
    connection.query(query, (err) => {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.send({message: 'product deleted'})
        }
    })
}

// updateProduct
export const updateProduct = async (req, res) => {
    const query = `UPDATE products SET 
        product_name = '${req.body.product_name}', 
        product_category = '${req.body.product_category}',  
        product_price = ${req.body.product_price}, 
        product_qty = ${req.body.product_qty}, 
        product_description = '${req.body.product_description}', 
        product_img = '${req.body.product_img}' 
        WHERE products.product_id = ${req.params.id};`


    connection.query(query, (err) => {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.send({message: 'product update'})
        }
    })
}

