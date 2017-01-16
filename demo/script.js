'use strict';

angular.module('angularTickerDemo', ['msl.ticker', 'msl.slides']).
  controller('DemoCtrl', function ($scope, $location, MslTickerDefaults) {
    $scope.text = $location.search()['text'] || MslTickerDefaults.TEXT;
    $scope.length = $location.search()['length'] || MslTickerDefaults.LENGTH;
    $scope.period = $location.search()['period'] || MslTickerDefaults.PERIOD;

    $scope.showTheCode = function () {
      $location.search('slide_number', 1);
    };
  });
