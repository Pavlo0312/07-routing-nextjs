// app/notes/filter/[...slug]/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

type RouteParams = { slug?: string[] };

export default async function NotesPage({ params }: { params: RouteParams }) {
  // беремо перший сегмент catch-all [...slug] як тег
  const rawTag = params.slug?.[0];
  // бекенд НЕ очікує 'all' → для 'all' тег не передаємо взагалі
  const tag: NoteTag | undefined =
    rawTag && rawTag.toLowerCase() !== "all" ? (rawTag as NoteTag) : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag ?? null],
    // ВАЖЛИВО: позиційні аргументи (searchText, page, perPage?, tag?)
    queryFn: () => fetchNotes("", 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
