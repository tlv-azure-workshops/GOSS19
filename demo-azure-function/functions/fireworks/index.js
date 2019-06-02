module.exports = async function (context, myQueueItem) {

    context.log("firework sent")
      context.bindings.signalRMessages = [{
        "target": "newMessage",
        "arguments": [ "" ]
      }];
      context.done();
};