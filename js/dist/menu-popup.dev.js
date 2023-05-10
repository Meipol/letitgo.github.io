"use strict";

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
$(".button").on("click", function () {
  $(".wrap, a").toggleClass("active");
  return false;
});