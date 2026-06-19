"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsProperties,
} from "@/lib/analytics";

interface AnalyticsEventProps {
  eventName: AnalyticsEventName;
  eventProps?: AnalyticsProperties;
}

interface AnalyticsLinkProps extends AnalyticsEventProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
}

interface AnalyticsAnchorProps
  extends AnalyticsEventProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

export function AnalyticsLink({
  href,
  eventName,
  eventProps,
  className,
  children,
  onClick,
}: AnalyticsLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        trackEvent(eventName, eventProps);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

export function AnalyticsAnchor({
  href,
  eventName,
  eventProps,
  children,
  onClick,
  ...props
}: AnalyticsAnchorProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        trackEvent(eventName, eventProps);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
