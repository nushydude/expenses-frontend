// @flow
import { format } from 'date-fns';

export function formatDateForHeadings(date?: Date = new Date()): string {
  return format(date, 'MMM d, yyyy');
}
