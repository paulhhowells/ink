/*jslint bitwise: true, eqeq: false, sloppy: true, white: true, browser: true, devel: true, indent: 2 */
/*globals phh, jQuery, window, document, location, setTimeout, clearTimeout, decodeURI, console, google, FB */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:false, undef:true, unused:true, curly:true, browser:true, jquery:true, indent:2, maxerr:50, sloppy:true, white:true, devel:true */
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
      var
        i,
        j,
        array,
        nesting_depth,
        permutations,
        base,
        base_array,
        $permutation,
        j_permutation,
        j_class;

      array = [12, 16];


      // test how the generated CSS works by creating a set of class use permutations to experiment with
      // loop through all the nesting permutations to the nesting_depth depth desired and build sets of nested divs for testing
      nesting_depth = 4;
      permutations = Math.pow(array.length, nesting_depth);

      for (i = 0; i < permutations; i += 1) {

        base = i.toString(array.length); // convert decimal to a base n number (as a string)
        base_array = base.split(""); // make an array of individual digits

        $permutation = $('<div/>').addClass('permutation');
        for (j = 0; j < nesting_depth; j += 1) {
          j_permutation = base_array[base_array.length - (j + 1)] || 0;
          j_class = 'f-' + array[j_permutation];
          $permutation.wrapInner($('<div/>').html(j_class).addClass(j_class));
        }
        $('#test').append($permutation);
      }
      // end of test permutations


      // roughing out with pixels to test code
      // will replace with loops and ems
      var
        rule = "",
        css = "",
        css_html = "",
        style;
      
      rule = ".f-12 {line-height: 20px}";
      css += rule;
      css_html += rule + "<br />";

      rule = ".f-16 {line-height: 20px}";
      css += rule;
      css_html += rule + "<br />";
      
      
      rule = ".f-12 {font-size: 12px}";
      css += rule;
      css_html += rule + "<br />";

      rule = ".f-16 {font-size: 16px}";
      css += rule;
      css_html += rule + "<br />";

      $('#output').html(css_html);
      
      // this bit probably won't work in IE7
      // however I doubt there are any web developers using IE7 as their primary browser
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  };

  $(function () { // ready
    ink.run();
  });

}(jQuery));