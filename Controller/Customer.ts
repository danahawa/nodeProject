import { Customer } from "../Database/entities/Customer.js"
import { AppError } from "../Errors/Error.js";


const createCustomer = async (payload : Customer)=>{
      
    const customer = await Customer.findOne({where:{mobilePhone:payload.mobilePhone}})

    if(customer){
        throw new AppError("This customer  already exists" ,409,true);
    }

    const newCustomer = await Customer.create(payload).save()
    return newCustomer;
}

const removeCustomer = async (idPostman : number)=>{
      const customer = await Customer.findOne({where:{id:idPostman}})

      if(!customer){
        throw new AppError("This customer does not exist",404,true);
      }
      return customer.remove();

}

const editCustomer = async (idPostman:number ,payload : Customer)=>{
    const customer = await Customer.findOne({where:{id:idPostman}})
    if(!customer){
        if(!customer){
            throw new AppError("This customer does not exist",404,true);
          }
    }

    if(payload.name){
        customer.name =  payload.name
    }

    if(payload.mobilePhone){
        customer.mobilePhone =  payload.mobilePhone
    }

    if(payload.balance){
        customer.balance =  payload.balance
    }

    return customer.save();
}

const getCustomer = async(id :number)=>{
    const customer = await Customer.findOne({where:{id}})
    if(!customer){
        throw new AppError("This customer does not exist",404,true);
    }

    return customer;
}
  
const getAllCustomers = async()=>{
    const customers = await Customer.find()
    if(customers.length===0){
        throw new AppError("No customers found.",404,true);
    }
    return customers;
}
    
export {createCustomer,removeCustomer ,editCustomer,getCustomer,getAllCustomers}