// index.js
// main script to interact with printer

var prompt = require('prompt');
prompt.start();

var tessel = require('tessel');
var thermalprinter = require('tessel-thermalprinter');

// setup printer
var printer = thermalprinter.use(tessel.port['A']);

var printCommand = function(printer) {
  prompt.get(['styles', 'text'], function(err, result) {
    if (result.text == null) {
      return;
    }
    printer.reset();
    result.styles.split(" ").forEach( function( style ) {
      printer[style](true);
    });
    printer.printLine(result.text);
    printer.print(function() {
      console.log("finished printing");
      printCommand(printer);
    });
  });
}
printCommand(printer);
