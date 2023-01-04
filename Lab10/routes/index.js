//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.
const userRoutes = require('./routesAPI');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;