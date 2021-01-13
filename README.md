# node-red-contrib-ui-statusbar

A node-red node contribution for the dashboard ui category to render leds, icons and and others in status bar.

## ToDos

### Check the existemce of the required subflows

this might be done by parseing the flow in the sbWidget on('input'). Doing this via http.request (see [here](https://nodejs.dev/learn/making-http-requests-with-nodejs)) also used in a [node-red-node](https://github.com/node-red/node-red-nodes/blob/9cc61cb0f14a4dec84bae4b1dc7d683f44068f5d/hardware/wemo/WeMoNG.js).

### Pull up the button

* The manager might provide a generic button context to provide a standardized frame for the widget. 
* Add the the text widget to the basics and create a new in flow example
* dynamically show and hide the widgest, so that theay show up in context

### Rethink labels

- sbw StautsBarWidget
- dsw dashboard  Widges

### Reorganization lables

- Type to type, Id to id, Options to options
- make ui_statusbarwidget a ui_stautsbarwidget - done!
- make the Statusbarconfig a stautsbarconfig - done!

### Dynamically load the html

- from file
- from git

Separate the nrStatusBar and the widget definition and oad separatly.

### Update object

Allow for object to be passed via the status e.g.:

- boolean: On OFF
- flash: ON with a timeout period

some of the function migh be buildin other specific to the widget 

### Snap.svg

inlcuding the [snap](http://snapsvg.io/) library will allow fancy animations, for a discussion about including lib for dashboard see [here](https://discourse.nodered.org/t/import-javascript-library-into-node-red/7665/27) 

The tutorial 3 might be a good starting point:

```
Snap.svg-0.5.1/demos/tutorial/3.html
```

### Just use raw JS

"Fortunately, it turns out that working with SVG in raw JS isn’t very hard, and for most basic SVG-related tasks you don’t need to include a fancy library at all! Most browser APIs that work on HTML nodes also work fine with SVG, with a few exceptions."

[here](https://chanind.github.io/javascript/svg/2019/01/13/manipulating-and-animating-svg-with-raw-javascript.html)




## Done

### Register vs Instantiate

- widgest gets **registered** when load in to the system
- widgest gets **instantiated** when created during runtime

