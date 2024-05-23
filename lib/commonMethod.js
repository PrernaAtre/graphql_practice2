const mongoose = require("mongoose");

function convertId(id)
{
    return new mongoose.Types.ObjectId(id);
}
module.exports = { convertId };
