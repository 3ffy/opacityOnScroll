OpacityOnScroll
===============

JQuery Plugin whose progessively reduce the opacity of an element relative to his scroll container / document.

(element recently visible = opacity 100%, element half hidden = opacity 50%, etc. until opacity = 0%).

Usage
-----

```
$('article').opacityOnScroll();
```

Working example
---------------

//TODO

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

    
```
$('article').opacityOnScroll({ 
    container: '#parent' //a parent div with a scroll bar (default = $(window)). Can use a jquery object too : $('#parent');
    beginning:250,
    end:250, //or '#nextDivInThePage' or $('#nextDivInThePage')
    velocity: 250 //or -250
});
```

Licencing
---------

The library is under the Open Source Licence BSD3 as defined to the LICENCE file provided.
In a nutshell this licence is one of the most permissive : you can use the library in your commercial project, modify it and redistributing it. The only constraint is to respect the author patent (one line comment is enought providing a link to the library repository and its licence file. Basically, you have to let the comment included inside the library).