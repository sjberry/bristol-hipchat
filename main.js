var Hipchatter = require('hipchatter');
var clone = require('clone');
var escape = require('escape-html');


/**
 * Creates and configures an instance of the bristol-hipchat target. Establishes message defaults by way of an internal
 * Message constructor.
 *
 * @constructor
 * @param {Object} options
 * @param {String} options.token The API key (must have the notification permission to send messages).
 * @param {Number} options.room The Room ID to which a message should be sent.
 * @param {String} options.from The name of the "person" from whom the message will be sent.
 * @param {String} [options.color='yellow'] The color scheme of the message.
 * @param {String} [options.message_format='html'] The format of the message that will be sent.
 * @param {Boolean} [options.notify=false] A flag indicating whether or not to notify the room. Note that this setting
 *     will not override the users' notification preferences for the target room.
 * @returns {Function} A target log function that can be registered with Bristol via `.addTarget()`.
 */
function Target(options) {
	var key, client, proto, room;

	if (options) {
		options = clone(options);
	}
	else {
		options = {};
	}

	client = new Hipchatter(options.token);
	room = options.room;

	delete options.token;
	delete options.room;

	proto = {
		message_format: 'html',
		notify: false
	};

	for (key in options) {
		if (!options.hasOwnProperty(key)) {
			break;
		}

		proto[key] = options[key];
	}

	return function(options, severity, date, message) {
		var payload;

		payload = clone(proto);

		if (typeof payload.color !== 'string') {
			switch(severity) {
				case 'info':
					payload.color = 'green';
					break;

				case 'warn':
					payload.color = 'yellow';
					break;

				case 'error':
					payload.color = 'red';
					break;

				default:
					payload.color = 'gray';
					break;
			}
		}

		if (proto.message_format === 'html') {
			payload.message = escape(message)
				.replace(/\n/g, '<br/>')
				.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
		}
		else {
			payload.message = message;
		}

		client.notify(room, payload);
	};
}


module.exports = Target;
