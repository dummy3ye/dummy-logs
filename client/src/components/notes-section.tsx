import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, StickyNote } from "lucide-react";
import NoteCard from "@/components/note-card";
import type { Note } from "@shared/schema";

export default function NotesSection() {
  const { data: notes, isLoading } = useQuery<Note[]>({
    queryKey: ["/api/notes"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <StickyNote className="mr-2 text-primary" />
            My Notes
          </h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-slate-100 animate-pulse">
              <div className="h-4 bg-slate-200 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center">
          <StickyNote className="mr-2 text-primary" />
          My Notes
        </h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </div>
      
      {notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <StickyNote className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">No notes yet</h3>
          <p className="text-slate-500 mb-6">Start creating notes to organize your thoughts and ideas.</p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create your first note
          </Button>
        </div>
      )}
    </div>
  );
}
