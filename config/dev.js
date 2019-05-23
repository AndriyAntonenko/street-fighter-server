module.exports = {
  mongoose: {
    url: "mongodb://andrii:123qwe@ds115671.mlab.com:15671/binary-task",
    options: {
      useNewUrlParser: true,
      promiseLibrary: global.Promise,
      poolSize: 5,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }
  }
};
