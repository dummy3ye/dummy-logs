import { useState } from "react";
import ProfileHeader from "@/components/profile-header";
import Navigation from "@/components/navigation";
import NotesSection from "@/components/notes-section";
import GitHubSection from "@/components/github-section";
import PlaceholderSection from "@/components/placeholder-section";
import ThemeToggle from "@/components/theme-toggle";
import { Github, Code, Box, Boxes, Package } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("notes");

  const renderSection = () => {
    switch (activeSection) {
      case "notes":
        return <NotesSection />;
      case "github":
        return <GitHubSection />;
      case "projects":
        return (
          <PlaceholderSection
            icon={Code}
            title="My Projects"
            description="Showcase your best work and development projects here."
            buttonText="Add Project"
            buttonAction={() => console.log("Add Project")}
          />
        );
      case "box1":
        return (
          <PlaceholderSection
            icon={Box}
            title="Box 1"
            description="This is a placeholder section. Add your custom content here."
          />
        );
      case "box2":
        return (
          <PlaceholderSection
            icon={Boxes}
            title="Box 2"
            description="This is a placeholder section. Add your custom content here."
          />
        );
      case "box3":
        return (
          <PlaceholderSection
            icon={Package}
            title="Box 3"
            description="This is a placeholder section. Add your custom content here."
          />
        );
      default:
        return <NotesSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <ProfileHeader />
      <Navigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>&copy; Hehe, The End.</p>
          </div>
        </div>
      </footer>

      <ThemeToggle />
    </div>
  );
}
