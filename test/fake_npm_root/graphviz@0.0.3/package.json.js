module.exports = {
  "name": "graphviz",
  "version": "0.0.3",
  "author": {
    "name": "Gregoire Lejeune",
    "email": "gregoire.lejeune@free.fr"
  },
  "description": "Node.js interface to the GraphViz graphing tool",
  "homepage": "http://algorithmique.net/",
  "contributors": [
    {
      "name": "Gregoire Lejeune",
      "url": "http://algorithmique.net"
    },
    {
      "name": "Mathieu Ravaux",
      "url": "http://mathieuravaux.com"
    }
  ],
  "repository": {
    "type": "git",
    "url": "http://github.com/glejeune/node-graphviz.git"
  },
  "keywords": [
    "graphviz",
    "dot"
  ],
  "engines": [
    "node >= 0.2.2"
  ],
  "directories": {
    "lib": "./lib"
  },
  "_id": "graphviz@0.0.3",
  "_nodeSupported": true,
  "_npmVersion": "0.2.16",
  "_nodeVersion": "v0.3.5",
  "dist": {
    "tarball": "http://registry.npmjs.org/graphviz/-/graphviz-0.0.3.tgz",
    "shasum": "67f5b8ef134d2a5bb1f73fb4ceaa4ff1841e787a"
  },
  "_engineSupported": true,
  "modules": {
    "graphviz.js": "lib/graphviz.js",
    "deps/graph.js": "lib/deps/graph.js",
    "deps/attributs.js": "lib/deps/attributs.js",
    "deps/edge.js": "lib/deps/edge.js",
    "deps/node.js": "lib/deps/node.js",
    "deps/core_ext/hash.js": "lib/deps/core_ext/hash.js",
    "ext/gvpr/dot2js.g": "lib/ext/gvpr/dot2js.g",
    "index.js": "lib/graphviz"
  },
  "files": [
    ""
  ],
  "_defaultsLoaded": true,
  "_bundledDeps": [],
  "_resolvedDeps": [],
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
    "package": "/home/dominic/dev/npm-remapper/fake_npm_root/.npm/graphviz/0.0.3/package",
    "modules": "/home/dominic/dev/npm-remapper/fake_npm_root/graphviz@0.0.3",
    "dependencies": "/home/dominic/dev/npm-remapper/fake_npm_root/.npm/graphviz/0.0.3/node_modules"
  }
}
