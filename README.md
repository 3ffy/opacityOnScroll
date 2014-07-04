OpacityOnScroll
===============

JQuery Plugin whose progessively reduce the opacity of an element relative to his scroll container / document.
(element at the top of the screen = opacity 100%, element half hidden = opacity 50%, etc. until opacity = 0%).

Usage
-----

```javascript
$(document).ready(function() {

    $('article').opacityOnScroll();

});
```

Working example
---------------

<http://codepen.io/anon/pen/hsxzb>

Options
-------

* container : 
    - {undefined} = the windows scroll, 
    - {string/object} = a selector/jquery object representing a parent div with a scroll bar.
     
* beginning : 
    - {int} = The value in pixel where the opacity reduction should start (default = 0).
     
* end : 
    - {int} = The value in pixel where the opacity = 0%, 
    - {undefined} = means the end of the element = 0%, 
    - {string/object} = a selector/jquery object of an element dont the vertical offset will be used to determine the moment when element opacity = 0% (a concrete example = the next element after the one involved into this plugin).
 
* velocity :
    - {int} = The rapidity used to transform the element from opacity = 100% to opacity = 0%. (The number can be positive or negative). It's a convenient way to manually cheat with the other params.

    
```javascript
$('article').opacityOnScroll({ 
    container: '#parent' //a parent div with a scroll bar (default = $(window)). Can use a jquery object too : $('#parent');
    beginning:250,
    end:250, //or '#nextDivInThePage' or $('#nextDivInThePage')
    velocity: 250 //or -250
});
```

Advanced Feature
----------------

The plugin can be paused/resumed for some specifics elements.

```javascript
//pause
$('article').opacityOnScroll(false);

//resume
$('article').opacityOnScroll(true);
```

*NB: after a lot of brainfuck moments, i finally decided to don't provide a 'remove' method. The cost to keep references to events we have to destroy later is so huge that it seems ridiculous to do that for a behaviour almost never used. I rather prefer to keep the plugin fast, trustable and so minimal. If you find a nice way to achieve that feature, your help is welcome !*

Licencing
---------

The library is under the Open Source Licence BSD3 as defined to the LICENCE file provided.
In a nutshell this licence is one of the most permissive : you can use the library in your commercial project, modify it and redistributing it. The only constraint is to respect the author patent (one line comment is enought providing a link to the library repository and its licence file. Basically, you have to let the comment included inside the library).

This code is made with love, please give it some love back ! 