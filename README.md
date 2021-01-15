# node-red-contrib-ui-statusbar

A node-red contribution for the dashboard ui category to render leds, icons and others in tool/ status bar.

![nrStatusbarComplex](/doc/nrStatusbarComplex.png)

*Complex example flow showing multiple statusbar widgets such as leds, icons, and text*

## Installation

Change in your `.node-red` folder and use `npm` for convient installation

```
cd ~/.node-red
npm install git+https://github.com/vukov/node-red-contrib-ui-statusbar.git
```

After the istallation there is on the node palette  a new category called Stausbar with one new node. Two additional subflows become associated with this category when running one of the examples.

## Examples

In the node-red menu under `Import -> Examples` there are currently two examples and the tow subflows available:

* Hello Statusbar - Simple led that can be triggerd to flash 
* Complex Statusbar - Several status bar widgest are populating the toolbar, such leds, icons, and text.
