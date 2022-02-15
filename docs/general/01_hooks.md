# Hooks

The [.hooks](.hooks) directory contains useful hooks to ease management of this repository.  
In particular, the [pre-commit](.hooks/pre-commit) hooks contains a script to automatically generate the README.md file with every commit.  
The directory containing the userscript will be used to determine its section (i.e. all the userscripts in the `Bugzilla` directory will be shown under the Bugzilla section). The userscripts will be listed in alphabetic order.  
The description will be extracted from the `@description` meta data in the script file, and the content of any markdown file with the name of the script inside the [docs/script](docs/scripts) directory will be appended (i.e. for a script called `my-script.user.js` all the `docs/scripts/my-script*.md` files will be processed).
The markdown files will be appended in alphabetic order.  
The same is valid for images inside the [images](images) directory, all the images which filename starts with the script name will be added - in alphabetic order - to the script description.
