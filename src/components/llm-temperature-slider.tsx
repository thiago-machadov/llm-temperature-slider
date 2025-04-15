"use client";

// Import motion for animations and React hooks
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Constants to configure the visual slider
const TOTAL_LINES = 21; // Number of vertical bars in the slider
const GAP = 19.5; // Space between each bar (in px)
const LINE_WIDTH = 1; // Width of each bar (in px)
const MAX_HEIGHT = 36; // Maximum height of a bar (in px)
const MIN_HEIGHT = 2; // Minimum height of a bar (in px)

export function LlmTemperatureSlider() {
  // Refs to access DOM elements and store mouse offset
  const sliderRef = useRef<HTMLDivElement>(null); // Ref for the draggable slider handle
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container of the bars
  const offsetRef = useRef(0); // Stores the offset between mouse and slider when dragging starts

  // State for the slider position and dragging status
  const [position, setPosition] = useState(0); // Current slider position (in px)
  const [isDragging, setIsDragging] = useState(false); // Whether the slider is being dragged

  // Effect to handle mouse movement when dragging the slider
  useEffect(() => {
    if (!isDragging) return; // Only run if dragging

    // Updates slider position as the mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left } = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the container, minus the initial offset
      const x = e.clientX - left - offsetRef.current;
      // Calculate the total width of the slider area
      const totalWidth = (TOTAL_LINES - 1) * GAP + TOTAL_LINES * LINE_WIDTH;
      // Clamp the position within the slider bounds
      const normalizedX = Math.max(0, Math.min(x, totalWidth));
      // Find the nearest bar index
      const lineIndex = Math.round(normalizedX / (GAP + LINE_WIDTH));
      // Snap the slider to the nearest bar
      setPosition(lineIndex * (GAP + LINE_WIDTH));
    };

    // Stop dragging when mouse is released
    const handleMouseUp = () => setIsDragging(false);

    // Add event listeners to the document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup listeners on unmount or when dragging stops
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Called when the user starts dragging the slider
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (containerRef.current) {
      const { left } = containerRef.current.getBoundingClientRect();
      // Store the offset between mouse and slider position
      offsetRef.current = e.clientX - left - position;
    }
    e.preventDefault();
  };

  // Calculates the height of each bar based on its distance from the slider
  const calculateHeight = (index: number) => {
    const currentPos = index * (GAP + LINE_WIDTH);
    const distance = Math.abs(position - currentPos);
    const maxDistance = (TOTAL_LINES - 1) * (GAP + LINE_WIDTH);
    // t is a normalized distance (0 = at slider, 1 = farthest)
    const t = distance / maxDistance;
    // Height decreases as distance increases, with a non-linear curve
    const height =
      MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * Math.pow(1 - t, 2.5);
    // Clamp height between min and max
    return Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height));
  };

  return (
    <div className="flex items-end gap-4 h-16">
      {/* Minimum value label */}
      <span className="text-black text-xs">0</span>
      {/* Container for the slider and bars */}
      <div ref={containerRef} className="flex items-end gap-[19.5px] relative">
        {/* Draggable slider handle */}
        <motion.div
          ref={sliderRef}
          className="group h-16 bg-black w-[1.5px] cursor-grab active:cursor-grabbing absolute opacity-100"
          style={{
            left: 0,
            bottom: 0,
            x: position,
            translateX: "-50%",
          }}
          animate={{ x: position }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onMouseDown={handleMouseDown}
        >
          {/* Value indicator above the slider handle */}
          <div className="group-hover:scale-125 font-bold bg-white rounded-full w-6 transition-all duration-300 h-6 text-sm flex items-center justify-center absolute top-0 left-1/2 -translate-x-1/2">
            {position / 410}
          </div>
          {/* Invisible area to make dragging easier */}
          <div className="absolute -left-8 -right-8 top-0 bottom-0" />
        </motion.div>
        {/* Render all the bars */}
        {Array.from({ length: TOTAL_LINES }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-black w-[1px]"
            animate={{ height: calculateHeight(i) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ height: calculateHeight(i) }}
          />
        ))}
      </div>
      {/* Maximum value label */}
      <span className="text-black text-xs">1</span>
    </div>
  );
}
