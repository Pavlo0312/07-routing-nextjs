import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// console.log("Token:", token);

const axiosParams = (
  searchText: string,
  page: number,
  perPage: number,
  tag?: NoteTag
) => ({
  params: {
    ...(searchText !== "" && { search: searchText }),
    ...(tag && { tag }),
    page,
    perPage,
  },
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  searchText: string,
  page: number,
  perPage: number = 12,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    "/notes",
    axiosParams(searchText, page, perPage, tag)
  );
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
