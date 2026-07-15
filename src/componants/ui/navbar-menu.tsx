"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const MenuItem = ({
  setActive,
  active,
  item,
  isActive,
  onClose,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  isActive?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}) => {
  // Inject onClose into every direct HoveredLink child so clicking closes the dropdown
  const childrenWithClose = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    // If child itself is a HoveredLink (div wrapper) dig one level
    if (child.type === 'div') {
      const inner = React.Children.map(
        (child.props as { children: React.ReactNode }).children,
        (c) =>
          React.isValidElement(c)
            ? React.cloneElement(c as React.ReactElement<{ onClose?: () => void }>, { onClose })
            : c
      );
      return React.cloneElement(child as React.ReactElement<{ children: React.ReactNode }>, { children: inner });
    }
    return child;
  });

  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white pb-1"
      >
        {item}
        {/* Active underline bar */}
        {isActive && (
          <motion.span
            layoutId="navbar-underline"
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-500 rounded-full"
            initial={false}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.p>
      <AnimatePresence>
        {active === item && children && (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", mass: 1, damping: 24, stiffness: 90 }}
            className="absolute top-[calc(100%_+_0.5rem)] left-1/2 -translate-x-1/2 pt-2"
          >
            <motion.div
              layoutId="active"
              className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
            >
              <motion.div layout className="w-max h-full p-4">
                {childrenWithClose}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-2xl border border-white/[0.15] bg-black/30 backdrop-blur-md shadow-lg flex justify-center space-x-4 px-8 py-4 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, onClose, ...rest }: { children: React.ReactNode; onClose?: () => void; href?: string; [key: string]: unknown }) => {
  const pathname = usePathname();
  const href = (rest.href as string) ?? "";
  // Exact match only — prevents /services from matching /services/something
  const isActive = pathname === href;

  return (
    <Link
      {...rest as any}
      onClick={() => onClose?.()}
      className={[
        "text-sm transition-colors duration-200",
        isActive
          ? "text-teal-400 font-semibold"
          : "text-neutral-400 dark:text-neutral-300 hover:text-white",
      ].join(" ")}
    >
      {children}
    </Link>
  );
};
