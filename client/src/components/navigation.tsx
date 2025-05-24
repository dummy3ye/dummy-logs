import { cn } from "@/lib/utils";
import { StickyNote, Github, Code, Box, Boxes, Package } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: "notes", label: "Notes", icon: StickyNote },
    { id: "github", label: "GitHub", icon: Github },
    { id: "projects", label: "Projects", icon: Code },
    { id: "box1", label: "Box 1", icon: Box },
    { id: "box2", label: "Box 2", icon: Boxes },
    { id: "box3", label: "Box 3", icon: Package },
  ];

  return (
    <nav className="sticky top-0 bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 z-10 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "py-4 px-2 border-b-2 font-medium whitespace-nowrap transition-colors flex items-center space-x-2",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                )}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
