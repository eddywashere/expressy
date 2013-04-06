# Expressy

Just another express mvc boilerplate. I built this to learn and explore app development with express.

This recipe includes jade templating with coffee & stylus for the clientside. Build's upon the basic app but *will have a bit more organization and features. Uses mongodb via mongoose.

## Instructions

Install mongo with homebrew below, or from [http://www.mongodb.org/downloads](http://www.mongodb.org/downloads)

    brew install mongodb

Install dependencies

	npm install

Start mongo database

    mongod

Preview your app with

    npm preview

Start app with

    npm production

If you like coffee, compile it with

    npm run-script brew

### Notes:

- still not sure about coffeescript, but its there
    - I wish there was an awesome connect middleware equivalent to stylus for coffeescript
        - actually, I wish there was a solid asset manager like sprockets :[

### Todo:

- add db config, models and odm thingy
- add some css patterns from other projects
- make this a solid starting point for future projects!

# License

License: [http://eddywashere.mit-license.org](http://eddywashere.mit-license.org)

