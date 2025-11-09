// app/notes/filter/@sidebar/default.tsx
import css from "./sidebar.module.css";

const TAGS = ["Work", "Meeting", "Shopping", "Home"] as const;

export default function SidebarDefault() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <a href="/notes/filter/all" className={css.menuLink}>
          All notes
        </a>
      </li>

      {TAGS.map((t) => (
        <li key={t} className={css.menuItem}>
          <a href={`/notes/filter/${t}`} className={css.menuLink}>
            {t}
          </a>
        </li>
      ))}
    </ul>
  );
}
