import React, {
  useEffect,
  useRef,
  ReactNode,
  useLayoutEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

interface CustomPopoverProps {
  open: boolean;
  anchorRect: DOMRect | null;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  offsetX?: number;
  offsetY?: number;
  className?: string;
  children: ReactNode;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
  open,
  anchorRect,
  onClose,
  onMouseEnter,
  onMouseLeave,
  offsetX = -10,
  offsetY = 0,
  className = "",
  children,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [adjustedTop, setAdjustedTop] = useState<number | null>(null);

  // Adjust popover position to prevent overflow
  useLayoutEffect(() => {
    if (!open || !anchorRect) {
      setAdjustedTop(null);
      return;
    }
    // Delay until content is rendered
    requestAnimationFrame(() => {
      const popover = popoverRef.current;
      if (popover) {
        const popoverHeight = popover.offsetHeight;
        let top = anchorRect.top + offsetY;
        // Check if bottom overflows
        const bottomSpace = window.innerHeight - (top + popoverHeight);
        if (bottomSpace < 0) {
          // Move popover up so it doesn't overflow
          top = Math.max(window.innerHeight - popoverHeight - 8, 8); // 8px margin
        }
        setAdjustedTop(top);
      }
    });
  }, [open, anchorRect, offsetY, children]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open || !anchorRect) return null;

  const style: React.CSSProperties = {
    position: "fixed",
    top: adjustedTop !== null ? adjustedTop : anchorRect.top + offsetY,
    left: anchorRect.right + offsetX,
    zIndex: 1300,
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: 8,
    minWidth: 150,
    padding: 12,
    maxHeight: `calc(100vh - 16px)`, // Always fits viewport with margin
    overflowY: "auto",
  };

  return ReactDOM.createPortal(
    <div
      ref={popoverRef}
      style={style}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body
  );
};

export default CustomPopover;
