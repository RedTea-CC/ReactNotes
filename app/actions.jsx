"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addNote, updateNote, delNote } from "@/lib/redis";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请填写内容").max(100, "字数最多 100"),
});

export async function saveNote(previousState, formData) {
  const noteId = formData.get("noteId");

  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };
  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  if (noteId) {
    await updateNote(noteId, JSON.stringify(data));
    revalidatePath("/", "layout");
  } else {
    await addNote(JSON.stringify(data));
    revalidatePath("/", "layout");
  }

  return { message: `Add Success!` };
}

export async function deleteNote(previousState, formData) {
  const noteId = formData.get("noteId");

  delNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");
}
