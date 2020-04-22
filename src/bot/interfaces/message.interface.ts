export interface Message {
  text: string;
  chat: {
    id: number;
  };
  from: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
  };
}
