"use client";

import { useSearchParams } from "next/navigation";

export default function SidebarNoteListFilter({ children }) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {children.map((child, index) => {
        const title = child.props.title;
        if (
          !searchText ||
          (searchText && title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return <li key={index}>{child}</li>;
        }
        return null;
      })}
    </ul>
  );
}
