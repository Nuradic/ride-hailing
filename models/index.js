const migrations=require("../db/migrations");
const BaseUser = require("../db/models");

class User extends BaseUser{

}

module.exports={
    user:User
}