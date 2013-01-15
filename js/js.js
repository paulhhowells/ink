/*jslint bitwise: true, eqeq: false, sloppy: true, white: true, browser: true, devel: true, indent: 2 */
/*globals phh, jQuery, window, document, location, setTimeout, clearTimeout, decodeURI, console, google, FB */
/*
Copyright Paul H Howells

*/
/* style
  SYMBOLIC_CONSTANTS
  variable_names
  $jquery_objects
  functionNames
  methodNames
  ConstructorClassNames
  css-class-names

  i, j, k loop iterators
  o private object
  r return object
  p public object
*/

(function ($) {
  var ink;
  
  ink = {
    base : [
      {
        font_size: 12,
        line_height: 18
      },
      {
        font_size: 15,
        line_height: 24
      }
    ],
    font_sizes : [12, 14], // scaffolding
    run : function () {
      var css = "";
      
      
      
      $('output').html(css);
    }
  };

  $(function () { // ready
    ink.run();
  });

}(jQuery));