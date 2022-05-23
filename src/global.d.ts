import { Ace } from '@core/models/ace/ace.interface';

declare global {
  interface Window {
    ace: Ace;
  }
}
