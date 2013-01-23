ink
===

## CSS micro-styles for font-sizes and baselines

At this point the CSS generated works with 4 classes in a row, but could it be done with less CSS?
At the moment only one baseline is being built and tested.

## Validation
After the CSS is generated a validation check of the last font-size in each test permutation is run.  Any errors are reported at the top of the page, and the permutation in question is highlighted in red.

## Tidy
The tidy boolean can be turned on while editing the javascript to improve the readability of the CSS output.

## To Do
+ extend to multiple baselines
+ add .f-12-18 font-size | line-height format
+ tidy up var statements and better merge with the ink object.
  + use font_sizes property of ink object
+ look for ways to reduce the number of css rules: make an array of all the css rules and iterate through every combination while testing for errors
+ build a UI for choosing font-sizes and baselines
