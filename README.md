# angular-ticker

A (stupid) AngularJS component for tickers.

## Table of contents

* [Demo](#demo)
* [Usage](#usage)
* [How to put it in your app](#how-to-put-it-in-your-app)
* [API](#api)
* [Disclaimer](#disclaimer)

## Demo

[Here](https://marcoliceti.github.io/angular-ticker).

**Note:** A copy of the demo code is inside the `demo` folder of this
repository.

## Usage

### Basic

```html
<msl-ticker
  text="'Talk is cheap. Show me the code!'"
  length="'7'"
  period="'250'">
</msl-ticker>
```

Note that:

* `text` is the text to display
* `length` is the number of cells for the ticker
* `period` is the time interval after which a character moves to the next cell
(measured in milliseconds)

Also, keep in mind that **styling is up to you**. See the [Styling](#styling)
section.

### Dynamic

```html
<msl-ticker
  text="your_text"
  length="your_length"
  period="your_period">
</msl-ticker>
```

...provided that `your_text`, `your_length`, `your_period` are suitable values
available inside the enclosing scope.

### Defaults

Parameters are **all** optional, i.e. you can even write something like this:

```html
<msl-ticker></msl-ticker>
```

When parameters are omitted default values from the `MslTickerDefaults` service
are used. This service is actually a plain JS object with a `TEXT`, `LENGTH` and
`PERIOD` properties representing the default values:

```javascript
angular.module('testDefaults', ['msl.ticker']).
  controller('TestDefaultsCtrl' function (MslTickerDefaults) {
    console.log(MslTickerDefaults.TEXT); // 'Talk is cheap. Show me the code!'
    console.log(MslTickerDefaults.LENGTH); // 7
    console.log(MslTickerDefaults.PERIOD); // 250
  });
```

If you don't like these defaults, you can change them inside a `config` block:

```javascript
angular.module('testDefaults', ['msl.ticker']).
  config(function (MslTickerDefaultsProvider) {
    MslTickerDefaultsProvider.text(':-D');
    MslTickerDefaultsProvider.length(5);
    MslTickerDefaultsProvider.period(500);
  });
```

### Styling

The HTML template for the ticker is just a sequence of `div`s (with
`display: inline-block;`), e.g.:

```html
<msl-ticker>
  <div>&nbsp;</div>
  <div>&nbsp;</div>
  <div>F</div>
  <div>O</div>
  <div>O</div>
  <div>&nbsp;</div>
  <div>B</div>
  <div>A</div>
  <div>R</div>
</msl-ticker>
```

Use the `msl-ticker > div` selector for further customization. A nice example
is inside the demo folder.

Keep in mind that the purpose of the ticker is to move characters from cell to
cell: how a cell can be styled is not (completely) part of the API.

## How to put it in your app

The ticker component is available inside an [npm package](https://www.npmjs.com)
called `angular-ticker`:

```bash
npm install angular-ticker
```

Once installed, remember to load the code:

```html
<html>
  <head></head>
  <body>
    <script src="node_modules/angular-ticker/ticker.js"></script>
  </body>
</html>
```

...and to declare `msl.ticker` as a dependency:

```javascript
var your_app = angular.module('yourApp', ['msl.ticker']);
```

## API

[Here](API.md) is a more detailed, official description of what the ticker does
and what you should (and should not) do when using the ticker.

Any behavior not explicitly documented there is to be intended as
implementation-specific and should not be relied on.

## Disclaimer

While nicely written and documented, this code was developed just for fun and
is **not tested** (not in an automated fashion, at least). That being said, it
seems to me that is working well :D

Also note that this code is MIT-licensed.

## Surprise!

You have read all this document?! Thank you. Here is a little gift: the demo
website of this repo supports text, length and period customization through
query parameters. You can use this feature to send funny messages to your
friends, e.g.:

https://marcoliceti.github.io/angular-ticker/demo/#!?text=eat%20my%20shorts
