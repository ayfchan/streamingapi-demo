var streamingSocket;

function startStreaming ( onTickFunction )
{
  streamingSocket = io.connect('https://oandadev-fxpractice.apigee.net', {'force new connection':true , resource:'weather'});   // forcing due to socket.io bug
  
  streamingSocket.on('connect', function () {
  
    var currencyList = ['EUR/USD'];
    if ( allRates ) currencyList = availablePairs;
    
    streamingSocket.emit('subscribe', {'instruments': currencyList});

    streamingSocket.on('tick', function (data) {
      onTickFunction( data );
    });
  });
}

function endStreaming ()
{
  streamingSocket.disconnect();
  streamingSocket.removeAllListeners();
}
