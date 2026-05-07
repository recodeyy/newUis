"use client";
import { useEffect } from 'react';

export default function ConsoleEasterEggs() {
  useEffect(() => {
    // Welcome message
    console.log(
      "%c RECODEY %c ARCHITECTURAL TECH STUDIO %c v1.0.0 ",
      "background: #FF3D00; color: white; font-weight: bold; padding: 4px 8px;",
      "background: #1A1A1A; color: #FF3D00; padding: 4px 8px;",
      "background: #08080E; color: #666; padding: 4px 8px;"
    );
    console.log("%cSYSTEM: Initialization complete. Deep-state protocol active.", "color: #00FF88; font-family: monospace;");
    console.log("%cTYPE 'HELP' FOR COMMANDS", "color: #FF3D00; font-weight: bold;");

    const handleKeyDown = (e) => {
      // Capture simple commands typed anywhere (not in inputs)
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      
      // Basic state for typing
      if (!window._cmd) window._cmd = "";
      
      if (e.key.length === 1) {
        window._cmd += e.key.toUpperCase();
        if (window._cmd.length > 10) window._cmd = window._cmd.slice(-10);
        
        if (window._cmd.endsWith("HELP")) {
          console.table([
            { command: "PROTOCOL", desc: "Show current security status" },
            { command: "WHO", desc: "Identify terminal operator" },
            { command: "FORGE", desc: "Open project list" },
            { command: "RECODEY", desc: "???" }
          ]);
          window._cmd = "";
        }
        
        if (window._cmd.endsWith("PROTOCOL")) {
          console.warn("WARNING: PROTOCOL 07-B ACTIVE. ENCRYPTION LEVEL: MAXIMUM.");
          window._cmd = "";
        }

        if (window._cmd.endsWith("WHO")) {
          console.log("%cOPERATOR IDENTIFIED: GUEST_USER_%s", "color: #FF3D00", Math.floor(Math.random() * 9999));
          window._cmd = "";
        }

        if (window._cmd.endsWith("RECODEY")) {
          console.log("%cFORGING THE NEXT INDUSTRIAL ERA.", "font-size: 20px; font-weight: bold; color: #FF3D00; text-shadow: 2px 2px #000;");
          window._cmd = "";
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
