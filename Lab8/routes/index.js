//Here you will require route files and export them as used in previous labs
const peopleRoutes = require('./people');

const constructorMethod = (app) => {
    app.use(peopleRoutes);
    app.use('*', (req, res) => {
      res.status(404);
      res.render('error', { errors: "Request Not Found",  title: "error"});
    });
  };
  
  module.exports = constructorMethod;

// const peopleRoutes = require('./people');
// const constructorMethod = (app) => {
//   app.use(peopleRoutes);
//   app.use('*', (req, res) => {
//     res.redirect('/people');
//   });
//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve('static/homepage.html'));
//   });
// };

// module.exports = constructorMethod;
