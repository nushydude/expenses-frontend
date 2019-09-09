// @flow
import { format } from 'date-fns';

export function formatDateForTables(date?: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd');
}
