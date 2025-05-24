import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface PlaceholderSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: () => void;
}

export default function PlaceholderSection({ 
  icon: IconComponent, 
  title, 
  description, 
  buttonText, 
  buttonAction 
}: PlaceholderSectionProps) {
  return (
    <div className="text-center py-16">
      <IconComponent className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
      <p className="text-slate-600 mb-8">{description}</p>
      {buttonText && buttonAction && (
        <Button onClick={buttonAction} className="bg-primary hover:bg-blue-700">
          {buttonText}
        </Button>
      )}
    </div>
  );
}
