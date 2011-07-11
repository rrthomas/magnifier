/*
  Magnifier: a jQuery Plugin (tested with 1.6.1)
  Version 2.0
  (c) Reuben Thomas 2011
  This code is in the public domain.

  Based on AnythingZoomer version 1.0 by Chris Coyier
  http://css-tricks.com/anythingzoomer-jquery-plugin/
  License: "Note: You can do whatever the heck you want with this."
*/

(function($) {
    $.magnifier = {
        defaults: {
            innerWrap: "#innerwrap",
            smallArea: "#small",
            mover: "#mover",
            largeArea: "#large"
        }
    };

    $.fn.extend({
        magnifier:function(config) {
            config = $.extend({}, $.magnifier.defaults, config);

            var wrap = this;
            var innerWrap = $(config.innerWrap);
            var smallArea = $(config.smallArea);
            var mover = $(config.mover);
            var largeArea = $(config.largeArea);

            smallArea.show();

            innerWrap
                .css({ width: "auto" })
                .mousemove(function (e) {
                    var x = e.pageX - smallArea.offset().left;
                    var y = e.pageY - smallArea.offset().top;
                    var x_offset = mover.width() / 2;
                    var y_offset = mover.height() / 2;

                    wrap
                        .width($("img", smallArea).width())
                        .height($("img", smallArea).height());
                    // FIXME: Shouldn't need to set this, but if I don't it is 4 pixels taller than wrap
                    smallArea
                        .width($("img", smallArea).width())
                        .height($("img", smallArea).height());

                    // FIXME: Should be able to use hover event, but doesn't work (as of jquery 1.6.1)
                    if (x < 0 || x > smallArea.width() || y < 0 || y > smallArea.height()) {
                        mover.hide();
                    } else {
                        mover.show();
                    }

                    mover.css({
                        left: x - x_offset,
                        top: y - y_offset
                    });

                    largeArea.css({
                        left: -(x * $("img", largeArea).width() / smallArea.width() - x_offset),
                        top: -(y * $("img", largeArea).height() / smallArea.height() - y_offset)
                    });
                });

            return this;
        }
    });
})(jQuery);
