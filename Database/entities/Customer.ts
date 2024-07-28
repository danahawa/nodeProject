import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Customer extends BaseEntity{
   /*  id (number, primary key)
    name (string)
    mobilePhone (string, unique)
    balance (number)
*/
   @PrimaryGeneratedColumn()
   id : Number

   @Column({length:255})
   name : String
   
   @Column({unique:true})
   mobilePhone : String
   
   @Column()
   balance: Number

}