import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CRM | Stttock",
  robots: "noindex, nofollow",
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
