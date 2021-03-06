module.exports = {
  "name": "npm",
  "description": "A package manager for node",
  "keywords": [
    "package manager",
    "modules",
    "install",
    "package.json"
  ],
  "version": "0.2.17",
  "homepage": "http://npmjs.org/",
  "author": {
    "name": "Isaac Z. Schlueter",
    "email": "i@izs.me",
    "url": "http://blog.izs.me"
  },
  "contributors": [
    {
      "name": "Steve Steiner",
      "email": "ssteinerX@gmail.com",
      "url": "http://websaucesoftware.com/blog/"
    },
    {
      "name": "Mikeal Rogers",
      "email": "mikeal.rogers@gmail.com",
      "url": "http://www.mikealrogers.com/"
    },
    {
      "name": "Aaron Blohowiak",
      "email": "aaron.blohowiak@gmail.com",
      "url": "http://aaronblohowiak.com/"
    },
    {
      "name": "Martyn Smith",
      "email": "martyn@dollyfish.net.nz",
      "url": "http://dollyfish.net.nz/"
    },
    {
      "name": "Mathias Pettersson",
      "email": "mape@mape.me",
      "url": "http://mape.me/"
    },
    {
      "name": "Brian Hammond",
      "email": "brian@fictorial.com",
      "url": "http://fictorial.com/"
    },
    {
      "name": "Charlie Robbins",
      "email": "charlie.robbins@gmail.com",
      "url": "http://www.charlierobbins.com/"
    },
    {
      "name": "Francisco Treacy",
      "email": "francisco.treacy@gmail.com",
      "url": "http://franciscotreacy.com/"
    },
    {
      "name": "Cliffano Subagio",
      "email": "cliffano@gmail.com",
      "url": "http://blog.cliffano.com/"
    },
    {
      "name": "Christian Eager",
      "email": "christian.eager@nokia.com",
      "url": "http://perpenduum.com"
    },
    {
      "name": "Dav Glass",
      "email": "davglass@gmail.com",
      "url": "http://blog.davglass.com"
    },
    {
      "name": "Alex K. Wolfe",
      "email": "alexkwolfe@gmail.com"
    },
    {
      "name": "James Sanders",
      "email": "jimmyjazz14@gmail.com",
      "url": "http://james-sanders.com/"
    },
    {
      "name": "Reid Burke",
      "email": "me@reidburke.com",
      "url": "http://reidburke.com/"
    },
    {
      "name": "Arlo Breault",
      "email": "arlolra@gmail.com",
      "url": "http://thoughtherder.com/"
    },
    {
      "name": "Timo Derstappen",
      "email": "teemow@gmail.com",
      "url": "http://teemow.com"
    },
    {
      "name": "Bradley Meck",
      "email": "bradley.meck@gmail.com"
    },
    {
      "name": "Bart Teeuwisse",
      "email": "bart.teeuwisse@thecodemill.biz",
      "url": "http://thecodemill.biz/"
    },
    {
      "name": "Ben Noordhuis",
      "email": "info@bnoordhuis.nl",
      "url": "http://bnoordhuis.nl/"
    },
    {
      "name": "Tor Valamo",
      "email": "tor.valamo@gmail.com",
      "url": "http://www.magnimedia.no/"
    },
    {
      "name": "Whyme.Lyu",
      "email": "5longluna@gmail.com",
      "url": "http://whyme.kuantu.com/"
    },
    {
      "name": "Olivier Melcher",
      "email": "olivier.melcher@gmail.com"
    },
    {
      "name": "Tomaž Muraus",
      "email": "kami@k5-storitve.net",
      "url": "http://www.tomaz-muraus.info"
    },
    {
      "name": "Evan Meagher",
      "email": "evan.meagher@gmail.com",
      "url": "http://evanmeagher.net/"
    },
    {
      "name": "Orlando Vazquez",
      "email": "ovazquez@gmail.com",
      "url": "http://2wycked.net/"
    }
  ],
  "repository": {
    "type": "git",
    "url": "http://github.com/isaacs/npm.git"
  },
  "bugs": {
    "email": "npm-@googlegroups.com",
    "url": "http://github.com/isaacs/npm/issues"
  },
  "directories": {
    "doc": "./doc",
    "man": "./man1",
    "lib": "./lib",
    "bin": "./bin"
  },
  "engines": {
    "node": ">=0.2.3"
  },
  "scripts": {
    "test": "make test",
    "postinstall": "./scripts/install-message.sh"
  },
  "licenses": [
    {
      "type": "MIT",
      "url": "http://github.com/isaacs/npm/raw/master/LICENSE"
    }
  ],
  "_id": "npm@0.2.17",
  "_engineSupported": true,
  "_npmVersion": "0.2.16",
  "_nodeVersion": "v0.3.5",
  "bin": {
    "npm": "bin/npm.js",
    "read-package-json": "bin/read-package-json.js",
    "semver": "bin/semver.js"
  },
  "files": [
    ""
  ],
  "_defaultsLoaded": true,
  "man": [
    "man1/activate.1",
    "man1/adduser.1",
    "man1/build.1",
    "man1/bundle.1",
    "man1/cache.1",
    "man1/changelog.1",
    "man1/coding-style.1",
    "man1/completion.1",
    "man1/config.1",
    "man1/deactivate.1",
    "man1/deprecate.1",
    "man1/developers.1",
    "man1/docs.1",
    "man1/edit.1",
    "man1/explore.1",
    "man1/faq.1",
    "man1/find.1",
    "man1/folders.1",
    "man1/get.1",
    "man1/init.1",
    "man1/install.1",
    "man1/json.1",
    "man1/link.1",
    "man1/list.1",
    "man1/ln.1",
    "man1/ls.1",
    "man1/npm.1",
    "man1/outdated.1",
    "man1/owner.1",
    "man1/publish.1",
    "man1/rebuild.1",
    "man1/registry.1",
    "man1/restart.1",
    "man1/rm.1",
    "man1/run-script.1",
    "man1/scripts.1",
    "man1/search.1",
    "man1/set.1",
    "man1/start.1",
    "man1/stop.1",
    "man1/tag.1",
    "man1/test.1",
    "man1/uninstall.1",
    "man1/unpublish.1",
    "man1/update.1",
    "man1/version.1",
    "man1/view.1",
    "man1/future-ideas/deploy.1",
    "man1/future-ideas/new-module-system.1",
    "man1/future-ideas/remote.1",
    "man1/future-ideas/site.1"
  ],
  "dist": {
    "shasum": "9144baff65640e694cd90e772725200412eea130",
    "tarball": "http://registry.npmjs.org/npm/-/npm-0.2.17.tgz"
  },
  "_bundledDeps": [],
  "_resolvedDeps": [],
  "modules": {
    "index.js": "npm"
  },
  "_npmConfig": {
    "showlevel": 1,
    "argv": {
      "remain": [
        "npmdep",
        "traverse@>=0.2.3",
        "seq@>=0.1.7",
        "npm@>=0.2.14",
        "graphviz@>=0.0.3",
        "chainsaw@>=0.0.5",
        "traverse@>=0.2.3",
        "traverse@>=0.2.3"
      ],
      "cooked": [
        "install",
        "npmdep"
      ],
      "original": [
        "install",
        "npmdep"
      ]
    },
    "registry": "http://registry.npmjs.org/",
    "binroot": "/home/dominic/bin",
    "username": "dominictarr",
    "email": "dominic.tarr@gmail.com",
    "manroot": "/home/dominic/share/man",
    "root": "/home/dominic/dev/npm-remapper/fake_npm_root",
    "auto-activate": "always",
    "auto-deactivate": true,
    "browser": "open",
    "color": true,
    "description": true,
    "dev": false,
    "force": false,
    "globalconfig": "/home/dominic/.node_libraries/.npm/nvm/0.0.6/package/v0.3.5/etc/npmrc",
    "gzipbin": "gzip",
    "listopts": "",
    "logfd": 2,
    "loglevel": "info",
    "must-install": true,
    "outfd": 1,
    "proxy": null,
    "rebuild-bundle": true,
    "recursive": false,
    "tag": "latest",
    "tar": "tar",
    "tmproot": "/tmp",
    "update-dependents": true,
    "userconfig": "/home/dominic/.npmrc"
  },
  "_env": {
    "MANPATH": "/home/dominic/.node_libraries/.npm/nvm/0.0.6/package/v0.3.5/share/man:",
    "SSH_AGENT_PID": "996",
    "SAL_USE_VCLPLUGIN": "gtk",
    "DEVTYPE": "drm_minor",
    "TERM": "linux",
    "SHELL": "/bin/bash",
    "XDG_MENU_PREFIX": "lxde-",
    "KERNEL": "card0",
    "XDG_SESSION_COOKIE": "499b5fc9e8295fc82aab81e7000003fb-1296369461.15437-1633599126",
    "NVM_PATH": "/home/dominic/.node_libraries/.npm/nvm/0.0.6/package/v0.3.5/lib/node",
    "SUBSYSTEM": "drm",
    "OLDPWD": "/home/dominic/dev/it-is",
    "DEVPATH": "/devices/pci0000:00/0000:00:02.0/drm/card0",
    "PRIMARY_DEVICE_FOR_DISPLAY": "1",
    "NVM_DIR": "/home/dominic/.node_libraries/.npm/nvm/0.0.6/package",
    "USER": "dominic",
    "LS_COLORS": "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.axa=00;36:*.oga=00;36:*.spx=00;36:*.xspf=00;36:",
    "TAGS": ":udev-acl:",
    "SSH_AUTH_SOCK": "/tmp/ssh-hPMJrvR964/agent.964",
    "MINOR": "0",
    "DESKTOP_SESSION": "LXDE",
    "PATH": "/home/dominic/.node_libraries/.npm/nvm/0.0.6/package/v0.3.5/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/home/dominic/bin:/home/dominic/bin",
    "ACTION": "add",
    "UDEV_LOG": "3",
    "PWD": "/home/dominic/dev/npm-remapper",
    "JOB": "dbus",
    "NPM": "/home/dominic/.node_libraries/.npm/",
    "LANG": "en_US.UTF-8",
    "NODE_PATH": "/home/dominic/dev:/home/dominic/forks",
    "MAJOR": "226",
    "DEVLINKS": "/dev/char/226:0",
    "_LXSESSION_PID": "964",
    "DEVNAME": "/dev/dri/card0",
    "HOME": "/home/dominic",
    "SHLVL": "1",
    "XDG_CONFIG_HOME": "/home/dominic/.config",
    "XORGCONFIG": "/etc/X11/xorg.conf",
    "UPSTART_INSTANCE": "",
    "LOGNAME": "dominic",
    "UPSTART_EVENTS": "filesystem started drm-device-added",
    "XDG_DATA_DIRS": "/usr/local/share/:/usr/share/:/usr/share/gdm/:/var/lib/menu-xdg/",
    "DBUS_SESSION_BUS_ADDRESS": "unix:abstract=/tmp/dbus-EWrBHaDK7i,guid=9c12a2164b4b4b14c00b68aa0000001c",
    "NVM_BIN": "/home/dominic/.node_libraries/.npm/nvm/0.0.6/package/v0.3.5/bin",
    "LESSOPEN": "| /usr/bin/lesspipe %s",
    "UPSTART_JOB": "lxdm",
    "INSTANCE": "",
    "DISPLAY": ":0",
    "XDG_CURRENT_DESKTOP": "LXDE",
    "LESSCLOSE": "/usr/bin/lesspipe %s %s",
    "XAUTHORITY": "/home/dominic/.Xauthority",
    "SEQNUM": "1333",
    "_": "/home/dominic/bin/npm",
    "COPY_EXTENDED_ATTRIBUTES_DISABLE": "1"
  },
  "_npmPaths": {
    "root": "/home/dominic/dev/npm-remapper/fake_npm_root",
    "dir": "/home/dominic/dev/npm-remapper/fake_npm_root/.npm",
    "cache": "/home/dominic/dev/npm-remapper/fake_npm_root/.npm/.cache",
    "tmp": "/tmp/npm-1296869747505",
    "package": "/home/dominic/dev/npm-remapper/fake_npm_root/.npm/npm/0.2.17/package",
    "modules": "/home/dominic/dev/npm-remapper/fake_npm_root/npm@0.2.17",
    "dependencies": "/home/dominic/dev/npm-remapper/fake_npm_root/.npm/npm/0.2.17/node_modules"
  }
}
