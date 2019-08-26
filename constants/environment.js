const DEV = 'development';
const PROD = 'production';
const ENV = DEV;

module.exports = {
    getEnv: function(){
      return ENV;
    },

    isProd: function(){
      return ENV===PROD;
    },

    isDev: function(){
      return ENV===DEV;
    }
}
