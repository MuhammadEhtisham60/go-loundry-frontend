import React from "react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/60 backdrop-blur-md transition-all duration-300">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl glass border border-primary/10 max-w-sm w-[90%] text-center shadow-elegant animate-fade-in-up">
        {/* Customized CSS loading spinner */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse"></div>
        </div>

        {/* Loading text with design font */}
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
            Elysian Suite
          </h3>
          <p className="text-xs text-muted-foreground tracking-wider uppercase animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
