import { Router , Request , Response, NextFunction } from "express";
import { createCustomer, editCustomer, getCustomer, removeCustomer ,getAllCustomers} from "../Controller/Customer.js";
import { Customer } from "../Database/entities/Customer.js";


const router = Router()

router.post('/',async(req:Request,res:Response, next:NextFunction)=>{
       try{
          if(!req.body.mobilePhone || !req.body.name || !req.body.balance){
            res.status(400).json({
                success : false,
                message : "some fields are missing"
            })
          }

          const customer = await createCustomer(req.body)
          res.status(201).json({
            success : true,
            message : "customer added successfully",
            customer : customer
        })

       }
       catch(err){
       next(err)
       }
})

router.delete('/:id',async(req:Request,res:Response, next:NextFunction)=>{
    const id = Number(req.params.id)
    try{
      
        const customer = await removeCustomer(id)
        res.json({
            messege:"customer deleted successfully",
            success: true
        })
    }catch(err){
        console.log("Error" + err);
        next(err)
    }
    
})

router.put('/:id',async(req:Request,res:Response, next:NextFunction)=>{
    const id = Number(req.params.id)
    const payload :Customer = req.body
   
    try {
        const customer = await editCustomer(id, payload)

        res.json({
            messege:"Customer edited successfully",
            success: true,
            customer:customer
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
    
})
//getCustomer
router.get('/:id',async(req:Request,res:Response, next:NextFunction)=>{
    const id = Number(req.params.id)
 
    try {
        const customer = await getCustomer(id)

        res.json({
            messege:"Customer retrieved successfully",
            success: true,
            customer:customer
        })
    } catch (err) {
        console.log("Error" + err);
        next(err)
    }
    
})

router.get('/',async(req:Request,res:Response, next:NextFunction)=>{
    try{
        const customers = await getAllCustomers()
        res.json({
            messege:"All Customers retrieved successfully",
            success: true,
            customer:customers
        })
    }
    catch(err){
        console.log("Error" + err);
        next(err)
    }
   

}  )

export default router