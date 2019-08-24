// @flow
import { BrowserRouter } from 'react-router-dom';

export class Router extends BrowserRouter {
  constructor(props){
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      console.log('initial history is: ', JSON.stringify(this.history, null,2));

      this.history.listen((location, action) => {
        console.log(
          `The current URL is ${location.pathname}${location.search}${location.hash}`
        )
        console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
      });
    }
  }
}
