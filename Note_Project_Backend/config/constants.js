const dotenv = require("dotenv");
dotenv.config();
const process = require("process");

class Constant {
  constructor() {
    //Status_code Constants
    (this.BAD_REQUEST = 400),
      (this.SUCCESS_CODE = 200),
      (this.DATA_CREATE_CODE = 201),
      (this.NOT_CODE = 404),
      (this.ERR_CODE = 500),
      (this.AUTH_CODE = 401),
      (this.FORB_CODE = 403),
      (this.SALTROUND = 10);

    this.SERVERERROR = "Internal Server Error";
    this.EXPIREDTOKEN = "Token Expired. Please login again.";
    this.MISSINGTOKEN = "Required Token Missing";
    this.MISSINGMANDATS = "Mandatory Headers Or Params Missing";
    this.INPUTMISSING = "Required Inputs Missing";
    this.SUCCESSRESPONSE = "Done Successfully";
    this.INVALID = "Invalid Credentials";
    this.VALIDINPUT = "Please Provide Valid Input";
    this.VALIDPASSWORD = "Please Provide Valid Password";
    this.INVALIDEMAIL = "Invalid Email Format";
    this.INVALIDPASSWORD =
      "Password Does Not Match. Please Enter The Correct Password.";
    this.UPDATEDSUCCESS = "Updated Successfully";
    this.SUCCESSCREATE = "Created Successfully";
    this.FETCHSUCCESS = "Fetched Successfully";
    this.DELETESUCCESS = "Deleted Successfully";
    this.USEREXIST = "User Already Exists";
    this.NOTEXIST = "No User Data Found";
    this.LOGINSUCCESS = "Login Successfully";
    this.LOGOUTSUCCESS = "Logout Successfully";
    this.UNAUTHORIZED = "Unauthorized User";
    this.NODATA = "Data Not Found";
  }
}

module.exports = new Constant();
