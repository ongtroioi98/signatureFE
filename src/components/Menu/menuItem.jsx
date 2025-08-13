import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
export default function MenuItem({ item, onClick }) {
  const t = useTranslations();
  return (
    <Link
      className="menu-item"
      href={item.url}
      key={item.key}
      onClick={onClick}
    >
      {t(item.key)}
    </Link>
  );
}
