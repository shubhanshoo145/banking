function config() {
  if (process.env.NODE_ENV === 'production') {
    return {
      dbURI: 'instaremrediscluster.jeclmu.ng.0001.euw1.cache.amazonaws.com',
      port: '6379',
      password: '',
    };
  }
  if (process.env.NODE_ENV === 'test') {
    return {
      dbURI: '127.0.0.1',
      port: '6379',
      password: '#insta@mer',
    };
  }
  if (process.env.NODE_ENV === 'qa') {
    return {
      dbURI: '192.168.2.222',
      port: '6379',
      password: '',
    };
  }

  return {
    dbURI: '127.0.0.1',
    port: '6379',
    password: '',
  };
}

module.exports = config();