// Develop: vmgabriel

// Libraries
import React from 'react';
import clsx from 'clsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
// Partial
import NavBar from './partial/Header.jsx';
import Footer from './partial/Footer.jsx';
// Routes
import Home from './home/Home.jsx';
import HelloWorld from './HelloWorld.jsx';
import ChartRealTime from './Chart-real-time.jsx';

// Styles
import '../assets/styles/App.scss';
import '../assets/styles/Global.scss';

export default function App() {
  const [ margin, setMargin ] = React.useState(false);

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar withMargin={setMargin} />

        <div className={clsx('order-padding', {
          'margin-menu': margin,
          'margin-base': !margin,
        })}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/hello" component={HelloWorld} />

            <Route exact path="/charts" component={ChartRealTime} />
          </Switch>
        </div>

        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
};
