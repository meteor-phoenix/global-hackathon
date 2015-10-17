# Global Hackathon

This project aims to create a package which allows other projects to be gamified by adding points, awards, and/or levels.

## Authors

* William Cobb
* Ivan Montiel
* Dan Peterson

## Documentation

### Settings

Make sure to set up your `settings.json` file in `src`. There is a `settings.example.json` file for you to use as a template.

The following are needed:

* Github Application Secret and Key
* Google Analytics tracking code
* Kadira Secret

### Dependencies

* Uses a github-api package that uses [node-github](https://github.com/mikedeboer/node-github). [See the full documentation here](http://mikedeboer.github.io/node-github/#issues.prototype.repoIssues). For example JSON results, see [the Github documentation](https://developer.github.com/v3/issues/#list-issues-for-a-repository).

* For github hooks to work, you will need to forward to your local environment using a tool like ngrok. Then run `./ngrok http 3000`. Grab the `.ngrok.io` url and paste it in as the `domain` setting in your `settings.json` file.
