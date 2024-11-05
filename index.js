import express from 'express'
import booksRouter from './routes/books.js' //.js extension needed
import recordsRouter from './routes/records.js'
import loginRouter from './routes/login.js';
import log from './middleware/logMiddleware.js'
import 'dotenv/config';
import * as Sentry from '@sentry/node';
import errorHandler from './middleware/errorHandler.js';

const app = express()

// Sentry.io
Sentry.init({
  dsn: "https://d690043ebbd6689eadce044618073296@o4508240574808064.ingest.de.sentry.io/4508240584310864",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json()); // middleware helper, we're going to be sending you information in a format called JSON. Please make sure you understand it and put it into the req.body object for us."

app.use(log)
app.use('/books', booksRouter)
app.use('/records', recordsRouter)
app.use('/login', loginRouter);


app.get('/', (req, res) => { //create a root route sends back a message when someone visits the homepage of our app
    res.send('Hello Everyone!')
  })

app.get('/about', (req, res) => {
    const html = '<h1>About Us</h1><p>Welcome to our website!</p>';
    res.send(html);
  });

// The sentry error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler); // order is important, last element of the chain

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
  }) 

  // start server at http://localhost:3000 listen for requests