# EventManager

Sample APIS:
* __Create Event:__ \
    *Description:* \
        API to create an event \
    *Params:*\
        1) Name: Name of event \
        2) startTime: start time of event . Format : YYYY/MM/DD HH:MM:SS \
        3) duration: duration of event in form of hours \
    *Example:*\
        curl --location --request POST 'localhost:8081/event/create' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "name":"test14",
                "startTime": "2022/03/07 18:30:00",
                "duration":1
            }'

* __Get Events:__ \
    *Description:*\
        API to list all events  \
    *Params:*\
        1) Type : Type of event. Allowed values : live,upcoming \
    *Example:* \
        curl --location --request GET 'localhost:8081/event/getList?type=live' \
        curl --location --request GET 'localhost:8081/event/getList?type=upcoming'