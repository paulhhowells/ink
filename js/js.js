/*jslint bitwise: true, eqeq: false, sloppy: true, white: true, browser: true, devel: true, indent: 2 */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:false, undef:true, unused:true, curly:true, browser:true, jquery:true, indent:2, maxerr:50, sloppy:true, white:true, devel:true, strict:false */
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
  var tidy = false;

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

      array = [11, 12, 13, 14, 15, 16, 18];
      // array = [12, 18, 24, 32];

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
        i_row,
        i_row_string,
        //i_rule,
        //j_rule,
        j_classes,
        j_font_size_px,
        j_font_size_em,
        k_row,
        calculateCombinations,
        nesting_required,
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

        rule = ".f-" + i_font_size_px + " {";
        css += rule;
        css_html += rule + "<br />";

        rule = "font-size: " + i_font_size_em + "em; ";
        css += rule;
        css_html += tab + rule + "<br />";

        rule = "line-height: " + i_line_height_em + "em;";
        css += rule;
        css_html += tab + rule + "<br />";

        rule = "} ";
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

      nesting 4
      12 12 18 12
      12 12 24 12

      12 18 12 18
      12 18 12 24
      12 18 12 32  .f-12 .f-32,  .f-18 .f-12 .f-32  -->  .f-18 .f-32,  .f-12 .f-18 .f-32
      */



      // we do not need 12 12 18 18 s


      var
        rows,
        extendRows,
        extended_rows;

      rows = [];

      // make pairs that = 1em
      for (i = 0; i < array.length; i += 1) {
        i_font_size_px = array[i];
        i_row_string = ".f-" + i_font_size_px +  " .f-" + i_font_size_px;
        rows.push(i_row_string);
      }

      // calculateSingleEms
      extendRows = function (font_sizes, pairs, nesting_required) {
        var
          i,
          i_pair,
          i_extension,
          extended_rows,
          nest_level,
          extend;

        extended_rows = [];
        nest_level = 1;

        extend = function (row_string, nest_level, previous_font_size) {
          var
            i,
            rows = [],
            i_rows,
            i_font_size;

          for (i = 0; i < font_sizes.length; i += 1) {
            i_font_size = font_sizes[i];
            i_row_string = ".f-" + i_font_size + " " + row_string;

            // avoid doubles
            // surely this bit can be refactored
            if (previous_font_size) {
              if (i_font_size !== previous_font_size) {
                rows.push(i_row_string);
              }
            } else {
              rows.push(i_row_string);
            }

            if (nest_level <= nesting_required) {
              i_rows = extend(i_row_string, nest_level + 1, i_font_size);
              rows = rows.concat(i_rows);
            }
          }
          return rows;
        };

        for (i = 0; i < pairs.length; i += 1) {
          i_pair = pairs[i];
          i_extension = extend(i_pair, nest_level, font_sizes[i]);
          extended_rows = extended_rows.concat(i_extension);
        }

        return extended_rows;
      };

      extended_rows = extendRows(array, rows, 1);
      rows = rows.concat(extended_rows);

      // print out single em rows
      // notice that we don't loop the last index
      for (i = 0; i < rows.length - 1; i += 1) {
        i_row_string = rows[i];
        css += i_row_string + ",";
        css_html += i_row_string + ",";
        if (tidy) {
          css_html += "<br />";
        } else {
          css_html += " ";
        }
      }
      css += rows[rows.length - 1] + " {font-size: 1em;} ";
      css_html += rows[rows.length - 1] + " {<br />" + tab + "font-size: 1em;<br />}<br /><br />";




      calculateCombinations = function (font_sizes, row_pair, nesting_required) {
        var
          combinations,
          previous_font_size,
          row_string,
          nest_level,
          row;

        previous_font_size = row_pair[1];
        row_string = ".f-" + row_pair[1] + " .f-" + row_pair[0];
        nest_level = 1;
        row = [];
        row.push(row_string);

        combinations = function (previous_font_size, row_string, nest_level) {
          var
            row,
            i,
            i_row_string,
            i_font_size;

          row = [];

          for (i = 0; i < font_sizes.length; i += 1) {

            i_font_size = font_sizes[i];

            if (i_font_size === previous_font_size) {
              // avoid twins, e.g. 12 & 12 - skip to the next iteration in the loop
              continue;
            }

            //if (nest_level === 1 && (i_font_size === row_pair[0] || i_font_size === row_pair[1])) {
              // avoid matching either of the values in the tail_pair - skip to the next iteration in the loop

            //if (nest_level === 1 && (i_font_size === row_pair[0] || i_font_size === row_pair[1])) {
            //  continue;
            //}

            i_row_string = ".f-" + i_font_size + " " + row_string;
            row.push(i_row_string);

            if (nest_level < nesting_required) {
              i_row = combinations(i_font_size, i_row_string, nest_level + 1);
              row = row.concat(i_row);
            }

          }
          return row;
        };


        row = row.concat(combinations(previous_font_size, row_string, nest_level));
        return row;
      };


      nesting_required = 2; // global nesting minus the two already calculated within the i & j loops

      // calculate combinations that result in anything but 1em
      for (i = 0; i < array.length; i += 1) {
        i_font_size_px = array[i];

        for (j = 0; j < array.length; j += 1) {
          j_font_size_px = array[j];
          j_font_size_em = i_font_size_px / j_font_size_px;

          if (j_font_size_em !== 1) {

            j_classes = calculateCombinations(array, [i_font_size_px, j_font_size_px], nesting_required);

            for (k = 0; k < j_classes.length; k += 1) {
              k_row = j_classes[k];

              css += k_row;
              css_html += k_row;

              if (k < j_classes.length - 1) {
                css += ", ";
                css_html += ",";

                if (tidy) {
                  css_html += "<br />";
                } else {
                  css_html += " ";
                }
              }
            }

            css += " {font-size: " + j_font_size_em + "em;} ";
            css_html += " {<br />" + tab + "font-size: " + j_font_size_em + "em;<br />}<br />";
          }
        }
      }

      // print out the CSS so that it can be copied & pasted
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
      var errors = 0;
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
            errors += 1;
          }
        });
      if (errors) {
        $('#output').prepend('<h2>errors: ' + errors + '</h2>');
      }

    }
  };

  $(function () { // ready
    ink.run();
  });

}(jQuery));