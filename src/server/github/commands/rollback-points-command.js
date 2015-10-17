RollbackPointsCommand = (function () {
  var handle = function (options) {
    // TODO check options
    UserPoints.remove(options);

    // TODO undo trigger achievements and levels
  };

  return {
    handle: handle
  }
});


      
