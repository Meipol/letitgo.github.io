"use strict";

$(document).ready(function () {
  // Load sound effect
  var sound = new Audio('sound.mov');
  var endSound = new Audio('end.mp3'); // Add input field for paragraph text

  var input = $('<input type="text" placeholder="describe a situation that you would like to let go" class="text-input"/>');
  $('body').prepend(input); // Add button to generate tile words

  var generateButton = $('<button>⬜</button>');
  $('body').append(generateButton); // Add button to shuffle words

  var shuffleButton = $('<button>⇆</button>');
  $('body').append(shuffleButton); // Add slider for font size

  var fontSizeSlider = $('<input type="range" min="10" max="50" value="20" class="slider">');
  $('body').append(fontSizeSlider); // Click event listener for generate tile words button

  generateButton.click(function () {
    generateTiles();
  }); // Pressing enter in the text input field generates the tiles

  input.keypress(function (event) {
    if (event.keyCode === 13) {
      alert("words are trapped on a screen, one by one let them go");
      generateTiles();
    }
  });

  function generateTiles() {
    // Get paragraph text from input field
    var paragraph = input.val();
    shuffleButton.on('click', function () {
      $('.tile-words').each(function () {
        var words = $(this).find('.tile');
        words.sort(function () {
          return 0.5 - Math.random();
        }).appendTo($(this));
      });
    }); // Split paragraph text into words

    var words = paragraph.split(' '); // Remove existing .tile-words elements

    $('.tile-words').remove(); // Create new .tile-words element

    var tileWords = $('<div class="tile-words"></div>');
    $('body').append(tileWords); // Create tiles for each word

    words.forEach(function (word, index) {
      var classes = 'tile word-' + word;

      if (index === 0) {
        classes += ' firstWord';
      }

      if (index === words.length - 1) {
        classes += ' lastWord';
      }

      var tile = $('<span class="' + classes + '">' + word + ' </span>');
      tileWords.append(tile); // Set font size based on slider value

      tile.css('font-size', fontSizeSlider.val() + 'px'); // Make each tile clickable to fade out and remove it

      tile.click(function () {
        // Play sound effect
        sound.play();
        $(this).fadeOut('slow', function () {
          $(this).remove();
        });
      });
    }); // blue screen when the last word is clicked

    $(".lastWord").on("click", function () {
      endSound.play();
      $(".blue-screen").fadeIn(5000);
    }); // Change background color of tile based on mouse position

    $('span').mousemove(function (event) {
      var x = event.pageX - $(this).offset().left;
      var y = event.pageY - $(this).offset().top;
      var hue = x / $(this).width() * 360;
      var saturation = y / $(this).height() * 50;
      var color = 'hsl(' + hue + ', ' + saturation + '%, 70%)';
      $(this).css('background-color', color);
    }); // Change font size of tiles based on slider value

    fontSizeSlider.change(function () {
      tileWords.find('.tile').css('font-size', $(this).val() + 'px');
    }); // Make tile words draggable

    tileWords.draggable();
  }
});