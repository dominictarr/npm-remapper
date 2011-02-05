# NpmRemapper #

detect and reassign what npm modules you are using.

useful for automating testing of dependency versions.

##Usuage##

    npm-remapper script.js

this will run `script` and print out a tree of the npm packages it's loaded.

you can tell it to load using different versions of the modules as well:

    npm-remapper -remap package 0.0.0 script.js
    
##why?##

intended purpose of this tool is to detect version dependency by testing your code with different dependency versions (easily!)
so you can know what versions work what works and what breaks.

##how?##

npm-remapper loads modules by replacing 'require'. this means it can be there to detect what is loading.
this is not how npm works, but this is a different use-case.

