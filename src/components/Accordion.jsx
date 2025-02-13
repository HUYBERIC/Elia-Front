import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Statistics from "./Statistics";

const Accordion = ({ i, expanded, setExpanded }) => {
  const isOpen = i === expanded;

  return (
    <div className="accordion-container">
      <motion.div
        className="accordion-btn"
        animate={{ backgroundColor: isOpen ? "#fce4d3" : "#f48228" }}
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <motion.span
          className="chevron-icon"
          animate={{ rotate: isOpen ? -180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.span>
        {isOpen ? "Hide statistics" : "Show statistics"}
        <motion.span
          className="chevron-icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.span>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {" "}
            <Statistics />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
