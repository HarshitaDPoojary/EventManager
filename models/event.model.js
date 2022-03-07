const mongoose = require('mongoose');
require('mongoose-type-email');
const autoIncrement = require('mongoose-sequence')(mongoose);

const eventSchema = mongoose.Schema({
    name : String,
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime : {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { 
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
}
);

module.exports = mongoose.model('Event', eventSchema);