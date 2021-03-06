// @flow
import { BrowserRouter } from 'react-router-dom';
import { env } from '../configs/env';

type Props = {};

// $FlowFixMe
export class Router extends BrowserRouter<Props> {
  constructor(props: Props) {
    // $FlowFixMe
    super(props);

    if (env.isDev) {
      // eslint-disable-next-line no-console
      console.log(
        'initial history is: ',
        // $FlowFixMe
        JSON.stringify(this.history, null, 2),
      );

      // $FlowFixMe
      this.history.listen((location, action) => {
        // eslint-disable-next-line no-console
        console.log(
          `The current URL is ${location.pathname}${location.search}${location.hash}`,
        );
        // eslint-disable-next-line no-console
        console.log(
          `The last navigation action was ${action}`,
          JSON.stringify(this.history, null, 2),
        );
      });
    }
  }
}
