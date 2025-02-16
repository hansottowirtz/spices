import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { appLanguage, spices } from "@/lib/spices";
import Link from "next/link";
import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {spices.map((spice) => {
                const englishName = spice.names.find(
                  (name) => name.lang === appLanguage
                );
                const name = englishName?.value ?? spice.id;
                return (
                  <SidebarMenuItem key={spice.id}>
                    <SidebarMenuButton>
                      <Link
                        href={`/spices/${encodeURIComponent(spice.id)}`}
                        className="p-4 text-sm flex flex-row gap-2 items-center leading-none"
                      >
                        <Image
                          src={`/spices/${spice.imageId ?? spice.id}.png`}
                          alt={spice.id}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        {name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
