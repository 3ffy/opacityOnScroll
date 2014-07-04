//TODO : pouvoir enabled / disabled chaque element à la volée
//TODO : tester avec une sous div qui n'a pas de scrollbar
//FIXME : n'a pas l'air de marcher si plusieurs elements dans le même selector $('.pleinsDeDiv').plugin(); :-(

/* OpacityOnScroll - version: 1.0 - author: 3ffy (Aurélien Gy) - aureliengy@gmail.com - http://www.aureliengy.com - licence: BSD 3-Clause Licence (@see licence file or https://raw.githubusercontent.com/3ffy/opacityOnScroll/master/LICENSE). */
(function($) {

    /**
     * Progessively reduce the opacity of an element relative to his scroll container / document
     * (element recently visible = opacity 100%, element half hidden = opacity 50%, etc. until opacity = 0%).
     *
     * @param {json} options You can configure some parameters to accelarate the opacity, or start / end earlier or late the opacity modification.
     *
     * container :
     *     {undefined} = the windows scroll,
     *     {string/object} = a selector/jquery object representing a parent div with a scroll bar.
     *
     * beginning :
     *     {int} = The value in pixel where the opacity reduction should start (default = 0).
     *
     * end :
     *     {int} = The value in pixel where the opacity = 0%,
     *     {undefined} = means the end of the element = 0%,
     *     {string/object} = a selector/jquery object of an element dont the vertical offset will be used to determine the moment when element opacity = 0% (a concrete example = the next element after the one involved into this plugin).
     *
     * velocity :
     *     {int} = The rapidity used to transform the element from opacity = 100% to opacity = 0%. (The number can be positive or negative). It's a convenient way to manually cheat with the other params.
     *
     * @return {object} The jquery object involved into the plugin (the chain is not broken).
     */
    $.fn.opacityOnScroll = function(options) {
        //defaults settings
        var settings = $.extend({
            container: undefined,
            beginning: 0,
            end: undefined,
            velocity: 0
        }, options);
        //if a selector or a jquery object is passed as settings.end, convert it to his top position inside the document.   
        if (settings.end !== undefined) {
            if (typeof settings.end == 'string') {
                settings.end = $(settings.end);
            }
            if (typeof settings.end == 'object') {
                settings.end = settings.end
                    .eq(0)
                    .offset()
                    .top;
            }
            //else = a number (directly used as the position)
        }
        //determine the real jquery object container
        if (typeof settings.container == 'string') {
            settings.container = $(settings.container);
        }
        if (typeof settings.container == 'object') {
            settings.container = settings.container.eq(0);
        } else {
            settings.container = $(window);
        }
        //attach each element to the window scroll event
        var that;
        return this.each(function() {
            that = this;
            calculate(that, settings.container, settings.beginning, settings.end, settings.velocity);
            settings.container
                .on('scroll', function() {
                    calculate(that, settings.container, settings.beginning, settings.end, settings.velocity);
                });
        });
    };

    /**
     * Caculate (and apply) the opacity of the element.
     *
     * @param {string} context    The selector used to find the element to modify.
     * @param {object} $container The jquery object representing the container of the element (this container need a scrollbar).
     * @param {int}    beginning  The offset of the first pixel to reach before start the opacity transformation.
     * @param {int}    end        The offset of the last pixel to reach before the element opacity = 0%. (if is not a valid number, the last vertical pixel of the element will be used).
     * @param {int}    velocity   Positive or negative user manual correction about the thresoldMax param (= speed / slow opacity process).
     */
    var calculate = function(context, $container, beginning, end, velocity) {
        $this = $(context);
        var st = $container.scrollTop() - beginning;
        //if the beginning is not a valid number, use the bottom of the current element instead
        if (typeof end != 'number') {
            end = $this.offset()
                .top + $this.outerHeight();
        }
        //apply eventual user manual correction
        end -= velocity + beginning;
        //modify the opacity relative to the current document scrollbar position
        if (st <= end) {
            var opacity = (1 - st / end)
                .toFixed(2);
            $this.css('opacity', opacity);
        } else {
            $this.css('opacity', 0);
        }
    };

}(jQuery));