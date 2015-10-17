Settings = {
  domain: 'http://some.ngrok.io',
  github: {
    key: "",
    secret: ""
  },
  job: {
    /**
     * Run the queue at once a second to say under the
     * Github API limit of 5000 requests an hour, because
     * there are 3600 seconds in an hour
     */
    interval: 1000
  }
};
