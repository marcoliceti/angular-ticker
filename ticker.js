'use strict';

angular.module('msl.ticker', []).
  provider('MslTickerDefaults', function () {
    var text = 'Talk is cheap. Show me the code!';
    var length = 7;
    var period = 250;

    this.text = function (T) {
      text = T;
    };
    this.length = function (L) {
      length = L;
    };
    this.period = function (P) {
      period = P;
    };

    this.$get = function () {
      return {
        TEXT: text,
        LENGTH: length,
        PERIOD: period
      };
    };
  }).
  component('mslTicker', {
    bindings: {
      input: '<text',
      length: '<',
      period: '<',
    },
    controller: function ($element, $interval, MslTickerDefaults) {
      var self = this;

      var i; // slice counter
      var length; // ticker length, i.e. number of characters to display
      var text; // text to display
      var scheduled_updates;


      // Take N characters (with N = length of the ticker), starting from i.
      // When i + N is bigger than S.length (with S being the text to display),
      // just take as much characters as you can, then take the others from the
      // beginning of S. Circular buffer style!
      function takeSlice(i) {
        var chars = text.split('');
        var first = chars.slice(
          i,
          Math.min(
            i + length,
            text.length
          )
        );
        var last = chars.slice(
          0,
          Math.max(
            0,
            length - (text.length - i)
          )
        );
        return first.concat(last);
      };

      // Take the next slice, i.e. the next bunch of characters to display,
      // publish it into the scope, increment the slice counter (possibly
      // restarting from zero)
      function update() {
        self.chars = takeSlice(i).map(function (x, i) {
          return { value: x, index: i }; // mapping to avoid ng-repeat duplicates
        });
        i = (i + 1) % text.length;
      }

      // Prefix the original input with N spaces (with N = length of the ticker)
      // in order to make the text appear from the right of the tikcker. Also
      // make sure that the text has a length which is a multiple of N by
      // appending zero or more additional spaces
      function fixInputLength(s) {
        var i, n;
        for (i = 0; i < length; i++) s = ' ' + s;
        n = length - (s.length % length);
        for (i = 0; i < n; i++) s += ' ';
        return s;
      }

      // Clear old state (scheduled updates, slice counter, ticker text and
      // ticker length)
      function reset() {
        $interval.cancel(scheduled_updates);
        i = 0;
        length = parseInt(self.length) || MslTickerDefaults.LENGTH;
        text = fixInputLength(self.input || MslTickerDefaults.TEXT);
      }

      // Update the ticker with the first slice, schedule next slices
      function start() {
        update();
        scheduled_updates = $interval(function () {
          update();
        }, parseInt(self.period) || MslTickerDefaults.PERIOD);
      }

      // Restart when parameters change
      this.$onChanges = function () {
        reset();
        start();
      };
    },
    template: '<div style="display: inline-block;"' +
                'ng-repeat="char in $ctrl.chars">' +
                '{{char.value !== \' \' ? char.value : \'&nbsp;\'}}' +
              '</div>'
  });
