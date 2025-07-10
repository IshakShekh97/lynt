"use client";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-background border-t">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-sm"></div>
            <span className="text-lg font-bold">LINKSHUT</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 LINKSHUT. Built with pure brutalist energy.
          </div>
        </div>
      </div>
    </footer>
  );
};
