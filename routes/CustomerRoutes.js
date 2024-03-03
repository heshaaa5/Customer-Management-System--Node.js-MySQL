const express=require('express');
const router=express.Router();


const customerController=require('../controllers/CustomerController');

router.get('',customerController.initializeUi);
router.post('',customerController.findCustomer);
router.get('/new-customer-form',customerController.newCustomerForm);
router.post('/create-customer',customerController.newCustomerForm);
router.get('/update-customer-form/:id',customerController.updateCustomerForm);



module.exports=router;