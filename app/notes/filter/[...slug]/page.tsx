import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);

  const initialData = await fetchNotes("", 1, 12, tag);

  return <NotesClient initialData={initialData} tag={tag} />;
}
