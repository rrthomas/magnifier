/*
  Magnifier: a jQuery Plugin (tested with 1.6.2)
  Version 2.4
  (c) Reuben Thomas 2011
  This code is in the public domain.

  Based on AnythingZoomer version 1.0 by Chris Coyier
  http://css-tricks.com/anythingzoomer-jquery-plugin/
  License: "Note: You can do whatever the heck you want with this."

  Usage: write some HTML with the following structure:

    <div id="wrap">
      <small_contents />
      <div id="mover"><large_contents /></div>
    </div>

  An example is shown in the included index.html under the comment
  "Magnifier". When the pointer is over the "small_contents" element,
  the corresponding part of the "large_contents" is shown inside
  moving window, the "mover" div, mapped proportionally to the
  "small_contents" element.

  Required CSS is shown in style.css, and the HTML required to set up
  magnifier in the "head" element is shown in index.html under
  "Magnifier setup".

  N.B.: The small_contents element must be visible when the magnifier
  is initialised.

*/

// Argument is object, with following elements permitted:
// mover: id for mover div [default "mover"]
(function($) {
    $.magnifier = { defaults: { mover: "mover" } };

    $.fn.extend({magnifier:function (config) {
        config = $.extend({}, $.magnifier.defaults, config);
        var wrap = this;
        var smallContents = $(':first', wrap);
        var mover = $("#"+config.mover);
        var largeContents = $(':first', mover);

        var x_offset = mover.width() / 2;
        var y_offset = mover.height() / 2;

        wrap
            .width(smallContents.width())
            .height(smallContents.height())
            .mousemove(function (e) {
                var x = e.pageX - wrap.offset().left;
                var y = e.pageY - wrap.offset().top;

                mover.css({
                    left: x - x_offset,
                    top: y - y_offset
                });

                largeContents.css({
                    left: -(x * largeContents.width() / smallContents.width() - x_offset),
                    top: -(y * largeContents.height() / smallContents.height() - y_offset)
                });
            })
            .mouseover(function (e) { mover.show(); })
            .mouseout(function (e) { mover.hide(); });

        return this;
    }});
})(jQuery);
