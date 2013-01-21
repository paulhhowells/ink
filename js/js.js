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
        k;
      
      var
        array,
        nesting_depth,
        permutations,
        base,
        base_array,
        $permutation,
        j_permutation,
        j_value,
        j_class;

      // array = [12, 16, 20];
      array = [12, 18, 24, 32];

      // test how the generated CSS works by creating a set of class use permutations to experiment with
      // loop through all the nesting permutations to the nesting_depth depth desired and build sets of nested divs for testing
      nesting_depth = 3;
      permutations = Math.pow(array.length, nesting_depth);

      for (i = 0; i < permutations; i += 1) {

        base = i.toString(array.length); // convert decimal to a base n number (as a string)
        base_array = base.split(""); // make an array of individual digits

        $permutation = $('<div/>').addClass('permutation');
        for (j = 0; j < nesting_depth; j += 1) {
          j_permutation = base_array[base_array.length - (j + 1)] || 0;
          j_value = array[j_permutation];
          j_class = 'f-' + j_value;
          $permutation.wrapInner($('<span/>').html(j_value).addClass(j_class));
        }
        $('#test').append($permutation);
      }
      // end of test permutations




      var
        rule = "",
        css = "",
        css_html = "",
        style,
        line_height_px,
        i_font_size_px,
        i_font_size_em,      
        i_line_height_em,
        i_rule,
        j_rule,
        k_rule,
        k_font_size_px,
        tab = '&#9;';
      
      line_height_px = 40;
      
      css_html += "<br />";
      css_html += "/*<br />";
      css_html += " * When rems are implemented across ALL of your <br />";
      css_html += " * user's browsers Ink CSS will be unnecessary. <br />";
      css_html += " * Until then&hellip;<br />";
      css_html += " */<br />";     
      
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
      
      
      // generate the 1em combinations 
      /* 
      BAA 
      ABB
      
      nesting 3:
      // f-18 f-12 f-24  -- 18 24 rules
      // f-24 f-12 f-18  -- 24 12 rules
      // f-24 f-18 f-12  -- 24 18 rules
      
      */

      /* calculate all rules that result in 1em */
      for (i = 0; i < array.length; i += 1) {
        i_font_size_px = array[i];     
        i_rule = ".f-" + i_font_size_px + " .f-" + i_font_size_px + ",";
        css += i_rule;
        css_html += i_rule + "<br />";
      
        for (j = 0; j < array.length; j += 1) {
            j_font_size_px = array[j];     
            j_rule = ".f-" + i_font_size_px + " .f-" + j_font_size_px + " .f-" + j_font_size_px;     
            if ((i !== array.length - 1) || (j !== array.length - 1)) { 
              j_rule += ",";
              css_html += j_rule + "<br />";
            } else {
              css_html += j_rule;
            }
            css += j_rule;      
        }
      }
      rule = " {font-size: 1em;}"
      css += rule;
      css_html += rule + "<br /><br />";

      /* calculate combinations that result in anything but 1em */
      for (i = 0; i < array.length; i += 1) {
        i_font_size_px = array[i];
        
        for (j = 0; j < array.length; j += 1) {
          j_font_size_px = array[j];
          j_font_size_em = j_font_size_px / i_font_size_px;
          
          if (j_font_size_em !== 1) {
            rule = ".f-" + i_font_size_px + " .f-" + j_font_size_px;
            css += rule;
            css_html += rule;

            for (k = 0; k < array.length; k += 1) {
              k_font_size_px = array[k];
              

              if ((k_font_size_px !== i_font_size_px) && (k_font_size_px !== j_font_size_px)) {
 
                k_rule = ".f-" + k_font_size_px + " " + rule;          
                css += "," + k_rule;
                css_html += ",<br />" + k_rule + " ";
              }
            }           

            rule = "{font-size: " + j_font_size_em + "em;}";           
            css += rule;
            css_html += rule + "<br />";
          } 
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
      
      
    // rough validation
    // find last child and get class
    // get font-size
    // and compare
    // highlight bg colour if not the same
    $('.permutation').
      each(function () {
        var
          $permutation,
          $last_child,
          target_font_size,
          found_font_size;
          
        $permutation = $(this);     
        $last_child = $('span:last', $permutation);

        target_font_size = $last_child.text();
        found_font_size = $last_child.css('fontSize').slice(0, -2);
        
        if (found_font_size !== target_font_size) {
          $permutation.css({'color' : 'red'});
        }       
      });
      
    }
  };

  $(function () { // ready
    ink.run();
  });

    
  
  
}(jQuery));