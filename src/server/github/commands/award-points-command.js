AwardPointsCommand = (function () {
  var handle = function (options) {
    // TODO check options
    UserPoints.insert(options);

    // TODO trigger achievements and levels
  };

  return {
    handle: handle
  }
});


      