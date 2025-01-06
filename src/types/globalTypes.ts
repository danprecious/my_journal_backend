export interface CreateJournalInput {
  title: string;
  content: string;
}

export interface UpdateJournal {
  id: string;
  title: string;
  content: string;
}

export interface Journal {
  title: string;
  content: string;
}

export interface CreateUser {
  email: string;
  name: string | null;
  password: string
} 

