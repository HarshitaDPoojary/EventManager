const Event = require('../models/event.model');
const moment = require('moment-timezone'); //moment-timezone
const { send } = require('../middlewares/responseHandler');

/**
 * @param  {String} name  Event Name
 * @param  {date} startTime Start time of event. Format YYYY/MM/DD HH:MM
 * @param  {number} duration Duration of event in terms of hours
 */
module.exports.create = async (req, res, next) => {
    try {
        const {
            name,
            startTime,
            duration
        } = req.body;
        var today = moment(startTime);
        console.log(today.date());
        var a = moment.tz(startTime, "Asia/Calcutta");
        console.log(a);
        if (duration) {
            var b = moment.tz(startTime, "Asia/Calcutta").add(duration,"hours")
        }

        const event = new Event({
            name,
            startTime:a,
            endTime:b
        })
        const eventResp = await event.save();
        send(null, eventResp.toJSON(), res, 200);

    } catch (error) {
        console.log(error);
        next(error);
    }
};

/**
 * 
 * @param {String} type Type of event: Upcoming/Live 
 */
module.exports.getList = async (req, res, next) => {
    try {
        const {
            type
        } = req.query;
        let query;
        let currentTime = moment.tz("Asia/Calcutta");
        console.log(currentTime);
        if (type.toLowerCase() == "upcoming") {

            let startTime = moment.tz(currentTime, "Asia/Calcutta").add(10, 'm');

            query = {
                startTime: {
                    $gt: startTime.add(5.5, 'h')
                }
            }
        } else if (type.toLowerCase() == "live") {
            let startTime = moment.tz(currentTime, "Asia/Calcutta").add(10, 'm');
            query = {
                $and: [
                    {
                        startTime: {
                            $lte: startTime.add(5.5, 'h')
                        },
                    }, {
                        endTime: {
                            $gte: currentTime.add(5.5, 'h')
                        }
                    }
                ]
            }
        }
        const resp = await Event.find(query).sort({"startTime":1});
        console.log(resp);
        send(null,[...resp],res,200)

    } catch (error) {
        console.log(error);
        next(error);
    }
}