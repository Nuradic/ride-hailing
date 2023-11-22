class Type {
  value;
  default;
  null = true;
  unique = false;
  index = false;
  blank;

  is_models_type=true;
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
    let make = [`${column} ${this.db_type}`];

    if (!this.null) make.push("NOT NULL");

    if (this.unique) make.push("UNIQUE");

    if((typeof this.default != 'undefined' && this.default != null)) make.push("DEFAULT "+ `'${this.default}'`);

    if (this.alter.index) this.index("INDEX");

    return make.join(" ");
  }

  field_detail(column){

    return {
        column:column,
        null:this.null,
        unique:this.unique,
        type:this.db_type,
        default:this.default
    }
  }

  alter() {}
}

class Charfield extends Type {
  required_parameters = ["max_length"];
  db_type = "VARCHAR(255)";

  constructor(args) {
    super(args)
    if(args.max_length) this.db_type=this.db_type.replace("255",`${args.max_length}`);
  }
}
class BoleanField extends Type {
    db_type = "BOOLEAN";
    constructor(args) {
      super(args);
    }
}
class BinaryField extends Charfield {
  db_type = "TEXT";
}
class TextField extends Charfield {
  db_type = "TEXT";
}

class SmallIntegerField extends Type {
  db_type = "SMALLINTEGER";
}
class IntegerField extends Type {
  db_type = "INTEGER";
}
class BigIntegerField extends Type {
  db_type = "BIGINTEGER";
}
class SmallSerial extends Type {
  db_type = "SMALLSERIAL";
}
class Serial extends Type {
  db_type = "SERIAL";
}
class BigSerial extends Type {
  db_type = "BIGSERIAL";
}

class DecimalField extends Type {
  db_type = "REAL";
}
class DateField extends Type {
    db_type="DATE"
}
class TimeField extends Type {
    db_type="TIME"
}

class TimestampField extends Type {
    db_type="TIMESTAMP"
    constructor(args) {
        super(args)
        // if(args.tz) this.db_type+="Z"; 
      }
}

class JSONField extends Type {
    db_type="JSON"
}

class ForeignKeyField extends Type{

    model;
    db_type="BIGINTERGER"

    constructor(model,args){
        super(args);
        this.model=model;
    }


    constraint(column){

        return `CONSTRAINT fk_${column}_${model.META.table_name}_id FOREIGN KEY(${column}) REFERENCES ${model.META.table_name}(id)`;

    }

}

class FileField extends Charfield{
    
}
class ImageField extends FileField{

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
    ForeignKeyField:(model,args)=>new ForeignKeyField(model,args),
    FileField:(args)=>FileField(args),
    ImageField:(args)=>ImageField(args)
}