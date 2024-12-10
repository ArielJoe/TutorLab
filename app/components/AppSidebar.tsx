"use client";

import { Gauge, UserRound, GraduationCap, ReceiptText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Student",
    url: "/student",
    icon: UserRound,
  },
  {
    title: "Teacher",
    url: "/teacher",
    icon: GraduationCap,
  },
  {
    title: "Receipt",
    url: "/receipt",
    icon: ReceiptText,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h1 className="text-center py-4 text-xl border-b border-b-primary">
            TutorLab
          </h1>
          <SidebarGroupContent className="my-3">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    pathname === item.url
                      ? "text-primary bg-primary/10 rounded-md"
                      : "text-muted-foreground hover:text-foreground",
                    "flex items-center gap-3 rounded-lg p-3 transition-all hover:text-primary"
                  )}
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 w-full"
                    >
                      <div>
                        <item.icon />
                      </div>
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex items-end py-4 border-t border-t-primary">
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
