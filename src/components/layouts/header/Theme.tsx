import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Theme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const handleThemeChange = () => setTheme(isDarkMode ? "light" : "dark");
  return (
    <div className="py-[7.5px] md:py-[11.5px]">
      <Button onClick={handleThemeChange} size="icon">
        {isDarkMode ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
};
