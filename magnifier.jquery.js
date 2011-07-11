/*
 Magnifier: a jQuery Plugin (tested with 1.6.1)
 Version 2.1
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
                                '<div style="position: relative"><img src="'+small+'" />' +
	                        '<div id="'+config.mover+'"></div></div>'
                                );

                      var smallArea = $(':first-child', wrap);
                      var mover = $("#"+config.mover);
                      mover.css({ backgroundImage: "url('"+large+"')", backgroundRepeat: "no-repeat" });

                      var largeImg = new Image();
                      largeImg.src = large;

                      $(window).load(function () {
                                         var x_offset = mover.width() / 2;
                                         var y_offset = mover.height() / 2;

                                         smallArea
                                             .mousemove(function (e) {
                                                            var x = e.pageX - $("img", smallArea).offset().left;
                                                            var y = e.pageY - $("img", smallArea).offset().top;

                                                            // FIXME: Should be able to use hover event
                                                            if (x < 0 || x > $("img", smallArea).width() || y < 0 || y > $("img", smallArea).height()) {
                                                                mover.hide();
                                                            } else {
                                                                mover.show();
                                                                mover.css({ left: x - x_offset, top: y - y_offset,
                                                                            backgroundPosition: "" +
                                                                            -(x * largeImg.width / $("img", smallArea).width() - x_offset) + "px " +
                                                                            -(y * largeImg.height / $("img", smallArea).height() - y_offset) + "px"
                                                                          });
                                                            }
                                                        });

                                     });

                      return this;
                  }
                 });
 })(jQuery);
