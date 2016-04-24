angular.module('fluro.notifications')

/////////////////////////////////////////////////////

.service('Notifications', function($timeout) {

    var controller = {
        list: [],
        expired:[],
        defaultDelay:4000,
    }

    /////////////////////////////////////////////////////

    controller.warning = function(text, delay) {
        controller.post(text, 'warning', delay);
    }

    controller.error = function(text, delay) {
        controller.post(text, 'error', delay);
    }

    controller.status = function(text, delay) {
        controller.post(text, 'status', delay);
    }

    /////////////////////////////////////////////////////

    controller.post = function(text, type, delay) {

        if (typeof type === 'undefined') {
            type = 'status';
        }

        if (typeof delay === 'undefined') {
            delay = controller.defaultDelay;
        }

        //Create the message
        var msg = {};
        msg.text = text;
        msg.type = type;
        msg.active = true;


        //Add an expiry function
        msg.expire = function() {

            //Remove this message
            var i = controller.list.indexOf(msg);
            if (i != -1) {
                controller.list.splice(i, 1);
            }

            //Move into the expired list
            controller.expired.push(msg);
        }


        //Add the message
        controller.list.push(msg)

        //Remove automatically after 5 seconds
        $timeout(msg.expire, delay);
    }

    /////////////////////////////////////////////////////

    return controller;
});