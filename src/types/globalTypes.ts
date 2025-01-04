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
