import SidebarNoteListFilter from "./SidebarNoteListFilter";
import SidebarNoteItem from "@/components/SidebarNoteItem";
import { getAllNotes } from "@/lib/redis";

export default async function NoteList() {
  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter>
      {Object.entries(notes).map(([noteId, note]) => {
        return (
          <SidebarNoteItem
            key={noteId}
            noteId={noteId}
            note={JSON.parse(note)}
          />
        );
      })}
    </SidebarNoteListFilter>
  );
}
