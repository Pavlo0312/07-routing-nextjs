"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { Note, NoteTag } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./Notes.module.css";

// Локальний тип відповіді (щоб не тягнути неіснуючі типи з lib/api)
type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

type NotesClientProps = {
  tag?: NoteTag;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debounced] = useDebounce(searchText, 300);

  const { data, isFetching, isSuccess, error } = useQuery<NotesResponse>({
    queryKey: ["notes", debounced, currentPage, tag ?? null],
    // ВАЖЛИВО: позиційні аргументи (searchText, page, perPage?, tag?)
    queryFn: () => fetchNotes(debounced, currentPage, 12, tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = (value: string) => {
    setCurrentPage(1);
    setSearchText(value);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchText} onSearch={handleSearch} />
        <button className={css.button} onClick={openModal}>
          + Add note
        </button>
      </div>

      {isFetching && <div className={css.loaderWrap}>Loading…</div>}
      {error && <p>Something went wrong</p>}

      {isSuccess && <NoteList notes={notes} />}

      {isSuccess && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
