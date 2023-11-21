class Type {
  value;
  default;
  null = true;
  unique = false;
  index = false;
  blank;
  required_parameters = [];

  updated = {};

  constructor(args) {

    if (args){

        
        this.null = args.null;
        this.default = args.default;
        this.blank = args.blank;

    }
  }

  init(column) {
    let make = [`${column} ${this.sql_eq}`];

    if (!this.null) make.push("NOT NULL");

    if (this.unique) make.push("UNIQUE");

    if (this.alter.index) this.index("INDEX");

    return make.join(" ");
  }

  alter() {}
}

class Charfield extends Type {
  required_parameters = ["max_length"];
  sql_eq = "VARCHAR(255)";

  constructor(args) {
    super(args)
    if(args.max_length) this.sql_eq=this.sql_eq.replace("255",`${args.max_length}`);
  }
}
class BoleanField extends Type {
    sql_eq = "BOOLEAN";
    constructor(args) {
      super(args);
    }
}
class BinaryField extends Charfield {
  sql_eq = "TEXT";
}
class TextField extends Charfield {
  sql_eq = "TEXT";
}

class SmallIntegerField extends Type {
  sql_eq = "SMALLINTEGER";
}
class IntegerField extends Type {
  sql_eq = "INTEGER";
}
class BigIntegerField extends Type {
  sql_eq = "BIGINTEGER";
}
class SmallSerial extends Type {
  sql_eq = "SMALLSERIAL";
}
class Serial extends Type {
  sql_eq = "SERIAL";
}
class BigSerial extends Type {
  sql_eq = "BIGSERIAL";
}

class DecimalField extends Type {
  sql_eq = "REAL";
}
class DateField extends Type {
    sql_eq="DATE"
}
class TimeField extends Type {
    sql_eq="TIME"
}

class TimestampField extends Type {
    sql_eq="TIMESTAMP"
    constructor(args) {
        super(args)
        if(args.tz) this.sql_eq+="Z"; 
      }
}

class JSONField extends Type {
    sql_eq="JSON"
}

class ForeignKeyField extends Type{

    model;
    sql_eq="BIGINTERGER"

    constructor(model,args){
        super(args);
        this.model=model;
    }


    constraint(column){

        return `CONSTRAINT fk_${column}_${model.META.table_name}_id FOREIGN KEY(${column}) REFERENCES ${model.META.table_name}(id)`;

    }

}


module.exports={
    Charfield:(args)=>new Charfield(args),
    TextField:(args)=>new TextField(args),
    BoleanField:(args)=>new BoleanField(args),
    SmallIntegerField:(args)=>new SmallIntegerField(args),
    IntegerField:(args)=>new IntegerField(args),
    SmallSerial:(args)=>new SmallSerial(args),
    Serial:(args)=>new Serial(args),
    BigSerial:(args)=>new BigSerial(args),
    BigIntegerField:(args)=>new BigIntegerField(args),
    DecimalField:(args)=>new DecimalField(args),
    BinaryField:(args)=>new BinaryField(args),
    DateField:(args)=>new DateField(args),
    TimeField:(args)=>new TimeField(args),
    TimestampField:(args)=>new TimestampField(args),
    JSONField:(args)=>new JSONField(args),
    ForeignKeyField:(model,args)=>new ForeignKeyField(model,args)
}