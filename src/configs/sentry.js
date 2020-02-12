import * as Sentry from '@sentry/browser';
import { env } from './configs/env';

Sentry.init({ dsn: env.sentryDSN });
