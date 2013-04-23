angular.module('RinDC.filters', []).
  filter('range',  function () {
    return function(input, total) {
      total = parseInt(total);
      //for (var i=1; i<total+1; i++)
      for (var i=total; i>0; i--)
        input.push(i);
      return input;
    };
  });