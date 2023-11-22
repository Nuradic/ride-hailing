const types=require("./types");
const db=require("./..")
class Model{

    updated_at= types.TimestampField({null:false,tz:true});
    created_at= types.TimestampField({null:false,tz:true});

    META={
        table_name:this.constructor.name,
    }


    constructor(){
        for(let property of Object.getOwnPropertyNames(this)){
            Object.defineProperty(this,property,{
                get(){

                    return this[property].value;

                },
                set(value){

                    this[property].value=value;

                    return value;

                }
            })

        }



    };

    alter_table(){

        let command="ALTER TABLE "

    }

    create_table(){
        let command=`CREATE TABLE IF NOT EXISTS ${this.META.table_name}(id BIGSERIAL PRIMARY KEY,`

        let columns=[];

        let prop=Object.getOwnPropertyNames(this);


        for (let item of prop){
            if( !(this[item].is_models_type) ) continue;
            columns.push(this[item].init(item));
        }


        let segment=columns.join(",") + ")";

        db.transaction(function (client){
            client.query(command+segment);

        },)



        return command + segment;
    }
    
     all() {
        
    };
    filter(){

    };
    values(){

    };

    order_by(){

    }

    group_by()
    {

    };

    save(){

    };

    join(){

    };
}
class BaseUser extends Model{
    phone=types.Charfield({max_length:255});
    first_name=  types.Charfield({max_length:512});
    last_name= types.Charfield({max_length:255,null:true});
    email=types.Charfield({max_length:255,null:true});
    verified=types.BoleanField({default:false})
    phone_verified=types.BoleanField({default:false})
    email_verified=types.BoleanField({default:false})


}
module.exports=BaseUser