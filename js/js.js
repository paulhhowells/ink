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

      // array = [12, 16, 20];
      array = [12, 18];

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
          $permutation.wrapInner($('<span/>').html(j_class).addClass(j_class));
        }
        $('#test').append($permutation);
      }
      // end of test permutations


      var
        rule = "",
        css = "",
        css_html = "",
        style,
        i_font_size_px,
        i_font_size_em,
        line_height_px,
        i_line_height_em,
        tab = '&#9;';
      
      var line_height_px = 30;
      
      /* base font-sizes and line-heights */      
      css_html += "<br />";
      css_html += "/* base font sizes */<br />";
      
      for (i = 0; i < array.length; i += 1) {
        i_font_size_px = array[i];
        i_font_size_em = i_font_size_px / 16;
        i_line_height_em = line_height_px / array[i];
 
        rule = ".f-" + i_font_size_px + " {"
        css += rule;
        css_html += rule + "<br />";
        
        rule = "font-size: " + i_font_size_em + "em;";
        css += rule;
        css_html += tab + rule + "<br />";
        
        rule = "line-height: " + i_line_height_em + "em;"
        css += rule;
        css_html += tab + rule + "<br />";
        
        rule = "}";
        css += rule;
        css_html += rule + "<br />";
      }
      
      css_html += "<br />";
      css_html += "/* font size combinations */<br />";
      
      for (i = 0; i < array.length; i += 1) {
        i_font_size_px = array[i];
        
        for (j = 0; j < array.length; j += 1) {
          j_font_size_px = array[j];
          j_font_size_em = j_font_size_px / i_font_size_px;
          
          rule = ".f-" + i_font_size_px + " .f-" + j_font_size_px + " {font-size: " + j_font_size_em + "em;}";
          css += rule;
          css_html += rule + "<br />";  
        }
      }
      
      
      /*
      rule = ".f-16 {font-size: 16px}";
      css += rule;
      css_html += rule + "<br />";
      */
      
      $('#output').html(css_html);
      
      // this bit probably won't work in IE7
      // however I hope there are not many web developers using IE7 as their primary browser in 2012
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