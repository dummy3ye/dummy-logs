import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/utils";
import type { Note } from "@shared/schema";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Development": "bg-slate-100 text-slate-700",
      "Design": "bg-green-100 text-green-700",
      "Backend": "bg-blue-100 text-blue-700",
      "Database": "bg-purple-100 text-purple-700",
      "DevOps": "bg-orange-100 text-orange-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-100">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-slate-800 text-lg">{note.title}</h3>
          <Badge className={`text-xs ${getCategoryColor(note.category)}`}>
            {note.category}
          </Badge>
        </div>
        <p className="text-slate-600 mb-4 line-clamp-3">
          {note.content}
        </p>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{note.author}</span>
          <span>{formatTimeAgo(note.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
