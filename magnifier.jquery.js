/*
  Magnifier: a jQuery Plugin (tested with 1.6.2)
  Version 2.4
  (c) Reuben Thomas 2011
  This code is in the public domain.

  Based on AnythingZoomer version 1.0 by Chris Coyier
  http://css-tricks.com/anythingzoomer-jquery-plugin/
  License: "Note: You can do whatever the heck you want with this."
*/

(function($) {
    $.magnifier = { defaults: { mover: "mover" } };

    $.fn.extend({magnifier:function(config, small, large) {
        config = $.extend({}, $.magnifier.defaults, config);
        var wrap = this;
        wrap.html(
            '<div style="position: relative;"><img src="'+small+'" /></div>' +
                '<div id="'+config.mover+'"><div style="position: absolute;"><img src="'+large+'" /></div></div>'
        );
        var smallArea = $(':first-child', wrap);
        var mover = $("#"+config.mover);
        var largeArea = $(':first-child', mover);

        var smallImg = new Image();
        smallImg.src = small;
        var largeImg = new Image();
        largeImg.src = large;

        $(window).load(function () {
            var x_offset = mover.width() / 2;
            var y_offset = mover.height() / 2;

            wrap
                .width(smallImg.width)
                .height(smallImg.height)
                .mousemove(function (e) {
                    var x = e.pageX - smallArea.offset().left;
                    var y = e.pageY - smallArea.offset().top;

                    mover.css({
                        left: x - x_offset,
                        top: y - y_offset
                    });

                    largeArea.css({
                        left: -(x * largeImg.width / smallImg.width - x_offset),
                        top: -(y * largeImg.height / smallImg.height - y_offset),
                    });
                })
                .mouseover(function (e) { mover.show(); })
                .mouseout(function (e) { mover.hide(); });
        });

        return this;
    }});
})(jQuery);
