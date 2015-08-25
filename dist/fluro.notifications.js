
//Create Fluro UI With dependencies
angular.module('fluro.notifications', [	]);
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

        var msg = {};
        msg.text = text;
        msg.type = type;
        msg.remove = function() {
            var i = controller.list.indexOf(msg);
            if (i != -1) {
                controller.list.splice(i, 1);
            }

            controller.expired.push(msg);
        }

        controller.list.push(msg)

        //Remove automatically after 5 seconds
        $timeout(msg.remove, delay);
    }

    /////////////////////////////////////////////////////

    return controller;
});