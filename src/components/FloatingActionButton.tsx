import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  onClick?: () => void;
}

const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full btn-campus shadow-elevated hover:shadow-glow transition-all duration-300"
      size="icon"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Create new request</span>
    </Button>
  );
};

export default FloatingActionButton;