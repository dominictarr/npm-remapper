npm-registry(1) -- The JavaScript Package Registry
==================================================

## DESCRIPTION

To resolve packages by name and version, npm talks to a registry website
that implements the CommonJS Package Registry specification for reading
package info.

Additionally, npm's package registry implementation supports several
write APIs as well, to allow for publishing packages and managing user
account information.

The official public npm registry is at <http://registry.npmjs.org/>.  It
is powered by a CouchDB database at
<http://isaacs.couchone.com/jsregistry>.  The code for the couchapp is
available at <http://github.com/isaacs/js-registry>.  npm user accounts
are CouchDB users, stored in the <http://isaacs.couchone.com/_users>
database.

The registry URL is supplied by the `registry` config parameter.  See
`npm help config` for more on managing npm's configuration.

## Can I run my own private registry?

Yes!

The easiest way is to replicate the couch database, and use the same (or
similar) design doc to implement the APIs.

If you set up continuous replication from the official CouchDB, and then
set your internal CouchDB as the registry config, then you'll be able
to read any published packages, in addition to your private ones, and by
default will only publish internally.  If you then want to publish a
package for the whole world to see, you can simply override the
`--registry` config for that command.

## Will you replicate from my registry into the public one?

No.  If you want things to be public, then publish them into the public
registry using npm.  What little security there is would be for nought
otherwise.

## Do I have to use couchdb to build a registry that npm can talk to?

No, but it's way easier.

## I published something elsewhere, and want to tell the npm registry about it.

That is supported, but not using the npm client.  You'll have to get
your hands dirty and do some HTTP.  The request looks something like
this:

    PUT /my-foreign-package
    content-type:application/json
    accept:application/json
    authorization:Basic $base_64_encoded

    { "name":"my-foreign-package"
    , "maintainers":["owner","usernames"]
    , "description":"A package that is hosted elsewhere"
    , "keywords":["nih","my cheese smells the best"]
    , "url":"http://my-different-registry.com/blerg/my-local-package"
    }

(Keywords and description are optional, but recommended.  Name,
maintainers, and url are required.)

Then, when a user tries to install "my-foreign-package", it'll redirect
to your registry.  If that doesn't resolve to a valid package entry,
then it'll fail, so please make sure that you understand the spec, and
ask for help on the <npm-@googlegroups.com> mailing list.

## Is there a website or something to see package docs and such?

No, but such a thing is planned, and a tiny bit developed.

Stay tuned!

## CONFIGURATION

### registry

Default: https://registry.npmjs.org/

The base URL of the npm package registry.

### _auth

A base-64 encoded "user:pass" pair.  This is created by npm-adduser(1).

If your config file is ever corrupted, you can set this manually by doing:

    npm adduser

### _authCrypt

If crypto.Cipher is available, and you have some private keys in `$HOME/.ssh`,
then npm will encrypt your "_auth" config before saving to the .npmrc file,
and will decrypt the "_authCrypt" config when it reads the .npmrc file.

### username, _password

Once the configuration is parsed, the `_auth` config is split into
`username` and `_password`.  This is the part before the ":"

### proxy

If proxy is available, then npm will access the registry via
the proxy server.

Example:

    proxy = http://user:password@proxy-server:8080

### tar

Default: env.TAR or "tar"

The name of a GNU-compatible tar program on your system.

### gzip

Default: env.GZIPBIN or "gzip"

The name of a GNU-compatible gzip program on your system.

