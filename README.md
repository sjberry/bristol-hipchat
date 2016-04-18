## bristol-hipchat

A plugin formatter for [Bristol](https://github.com/TomFrost/Bristol) that supports sending
notifications to [Atlassian HipChat](hipchat.com).


#### Installation

`npm install bristol-hipchat`


#### Example

```javascript
var Bristol = require('bristol').Bristol();
var BristolHipChat = require('bristol-hipchat');


var logger = new Bristol();

logger.addTarget(new BristolHipChat({
    token: 'xxxxxx',
    room: 23456,
    from: 'myapp',
    color: 'red',
    notify: true
})
    .withFormatter('human')
    .withLowestSeverity('error');
```


#### Options

**token**

>Type: string<br/>
_required_

The API key used for creating the underlying `node-hipchat` client. The API key used must have the notification
permission to send messages. Admin keys should also work fine.


**room**

>Type: number<br/>
_required_

The Room ID to which a message should be sent.


**from**

>Type: string<br/>
_required_

The name of the "person" from whom the message will be sent.


**color**

>Type: string<br/>
Default: yellow<br/>
Valid values: yellow, green, red, purple, gray, random

The color scheme of the message.


**message_format**

>Type: string<br/>
Default: html<br/>
Valid values: text, html

The format of the message that will be sent.


**notify**

>Type: boolean<br/>
Default: `false`

A flag indicating whether or not to notify the room. Note that this setting will not override the users' notification
preferences for the target room.
