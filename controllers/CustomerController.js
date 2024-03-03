const connectionPool=require('../db/DatabaseConnection');

const initializeUi=(req,resp)=>{
      connectionPool.getConnection((error,connection)=>{
        if(error){
            throw error;
        }
         console.log(connection.threadId);
         
          
         const sql='SELECT * FROM customer';
         connection.query(sql,(err,rows)=>{
            
            connection.release();
            if(!err){
                resp.render('home',{rows});
            }else{
                console.log(err);
            }

            console.log(rows);
         });
      });
}
const findCustomer = (req, resp) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }
        let searchText = req.body.text;

        // Construct the SQL query properly
        let query = 'SELECT * FROM customer WHERE name LIKE ? OR address LIKE ?';
        connection.query(query, ['%' + searchText + '%', '%' + searchText + '%'], (err, rows) => {
            connection.release();
            if (!err) {
                resp.render('home', { rows });
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    });
}


const newCustomerForm=(req,resp)=>{
    resp.render('new-customer-form');
}

const createCustomer= (req,resp)=>{
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }
       const{nic,name,address,salary} = req.body;

      
        
        connection.query("INSERT INTO customer VALUES (?,?,?,?)", [nic,name,address,salary], (err, rows) => {
            connection.release();
            if (!err) {
                resp.render('home', { rows });
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    });
}

const updateCustomerForm=(req,resp)=>{
    connectionPool.getConnection((error, connection) => {
        if (error) {
            throw error;
        }
        connection.query("SELECT * FROM customer WHERE nic=?", [req.params.nic], (err, rows) => {
            connection.release();
            if (!err) {
                resp.render('update-customer-form',{rows});
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    });
}

module.exports={
    initializeUi, findCustomer,newCustomerForm,createCustomer,updateCustomerForm
}