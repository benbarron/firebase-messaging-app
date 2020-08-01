import { User } from 'firebase';

export interface ReduxState {
  user: User | null;
}
