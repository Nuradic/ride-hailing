const types=require("./types");
class Model{

    updated_at= types.TimestampField({null:false,tz:true});
    created_at= types.TimestampField({null:false,tz:true});

    META={
        table_name:this.constructor.name,
    }


    constructor(){


    };

    create_table(){
        let command=`CREATE TABLE IF NOT EXISTS ${this.META.table_name}(id BIGSERIAL PRIMARY KEY,`

        let columns=[];

        let prop=Object.keys(this);

        for (let item of prop){
            if("META"===item) continue;
            columns.push(this[item].init(item));
        }


        let segment=columns.join(",")+ ")";



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
    first_name=  types.Charfield({max_length:512})
    last_name= types.Charfield({max_length:255,null:true})
    email=types.Charfield({max_length:255,null:true})
    car=types.ForeignKeyField("CAR")

}
module.exports=BaseUser