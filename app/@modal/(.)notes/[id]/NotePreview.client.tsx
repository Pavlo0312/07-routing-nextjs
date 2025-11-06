"use client";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClickBack}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2 className={`${css.header} ${css.h2}`}>{note.title}</h2>
          </div>
          <p className={css.tag}>Category: {note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <button className={css.backBtn} onClick={handleClickBack}>
            Exit
          </button>
          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Modal>
  );
}
