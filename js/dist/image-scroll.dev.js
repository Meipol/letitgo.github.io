"use strict";

$(document).ready(function () {
  //by Pixels
  var whight = window.innerHeight;
  var imgSpace = whight;
  !imgSpace && imgSpace++;
  $(window).resize(function () {
    $("body").css("height", $(window).height() + imgSpace * ($(".image").length - 1) + "px");
  });
  $(window).trigger("resize");
  $("#c1").fadeIn(0);
  $(".image").click(function () {
    var NxtIMG = Math.trunc($(document).scrollTop() / imgSpace) + 1;
    NxtIMG >= $(".image").length && (NxtIMG = 0);
    $(window).scrollTop(NxtIMG * imgSpace);
  });
  $(window).scroll(function () {
    var pos = $(document).scrollTop();
    console.log(pos);
    hideAll("c" + (Math.trunc(pos / imgSpace) + 1));
    $("#c" + (Math.trunc(pos / imgSpace) + 1)).fadeIn(0);
  });

  function hideAll(exceptMe) {
    $(".image").each(function (i) {
      if ($(this).attr("id") == exceptMe) return;
      $(this).fadeOut(200);
    });
  }
});