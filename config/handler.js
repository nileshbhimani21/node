const { successfully } = require("./message")

module.exports.errorHandler = (error) => {
    if(error.code === 11000){
        return "Already Exist."
    }
    return error._message ? error._message : error
}
module.exports.resHandler = (res) => {
    return {data: res ? res : null, message: successfully, status: 200}
}