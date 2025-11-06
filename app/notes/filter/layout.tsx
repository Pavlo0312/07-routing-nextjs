import css from "./LayoutNotes.module.css";

type SidebarProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function LayoutNotes({ children, sidebar }: SidebarProps) {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
