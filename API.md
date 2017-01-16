# API

## v1.x:

### The `msl.ticker` module

The ticker component is published inside an AngularJS module called
`msl.ticker`.

### The `MslTickerDefaults` and its provider

This module contains defines a `MslTickerDefaults` service with its provider.

`MslTickerDefaults.TEXT`, `MslTickerDefaults.LENGTH`,
`MslTickerDefaults.PERIOD` are the default values for the parameters of the
ticker.

These default values should be modified **only** through the
`MslTickerDefaultsProvider` and its `text`, `length` and `period` setter
methods inside a `config` block.

### The `mslTicker` component

The `mslTicker` component has 3 optional parameters called `text`, `length`
and `period`.

Values for these parameters are obtained from the surrounding scope through
_one-way binding_ (i.e. the `<` operator).

When these values change, the ticker restarts and adjust its behavior
accordingly, e.g. changes the text to display or the speed.

If you don't need this feature and / or want to keep the surrounding scope
clean, you can also use single-quoted strings, e.g.
`<msl-ticker text="'Hello World'"></msl-ticker>`.

### More on the `mslTicker` parameters

The `text` displayed by the ticker contains the text provided, plus a number
of blank spaces added for aesthetic reasons.

`length` and `period` should be strings representing integer numbers (if parsing
fails, default values are used).

`length` is the number of _cells_ of the ticker.

`period` is measured in milliseconds and represents the desired time after
which a characters moves from a cell to the next. The actual time may change
at runtime depending on how much the browser is busy.

### Styling

The template for the ticker is just a sequence of `div`s, each one representing
a distinct cell. These `div`s have `display: inline-block;`.

You **should not** alter the HTML of the ticker.

You **can** (and should) alter its CSS, and the suggested selectors for doing it
are `msl-ticker` and `msl-ticker > div`.
