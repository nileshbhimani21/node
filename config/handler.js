const { successfully } = require("./message")

module.exports.errorHandler = (error) => {
    if(error.code === 11000){
        return {message: "Already Exist."}
    }
    if(error.name === "TokenExpiredError"){
        return {message: error._message ? error._message : error.message,status : 401 }
    }
    return {message: error._message ? error._message : error }
}
module.exports.resHandler = (res) => {
    return {data: res ? res : null, message: successfully, status: 200}
}