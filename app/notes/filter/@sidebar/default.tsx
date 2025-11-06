import { NoteTag } from "@/types/note";
import css from "./SidebarNotes.module.css";

import Link from "next/link";

export default function SidebarNotes() {
  const sidebarOpt: (NoteTag | "All")[] = [
    "All",
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ];

  return (
    <ul className={css.menuList}>
      {sidebarOpt.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
