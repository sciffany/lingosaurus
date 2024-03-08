"use client";

import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Flex, Group } from "@mantine/core";
import { IconEdit, IconBook, IconLogout } from "@tabler/icons-react";
import classes from "../../admin/NavbarSimple.module.css";
import axios from "axios";
import SigninButton from "../../../components/SigninButton";

export default function BasicAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  async function createBlog() {
    const { data: blog } = await axios.post("/api/blogs");
    window.location.href = `/admin/${blog.data.id}`;
  }

  const data = [
    { action: createBlog, label: "Write Story", icon: IconEdit },
    { link: "", label: "My Stories", icon: IconBook },
    { link: "", label: "Logout", icon: IconLogout },
  ];

  const links = data.map((item) => (
    <a
      className={classes.link}
      href={item.link}
      onClick={item.action}
      key={item.label}
    >
      <Flex
        columnGap={10}
        style={{
          cursor: "pointer",
        }}
      >
        <item.icon stroke={1.5} />
        <span>{item.label}</span>
      </Flex>
    </a>
  ));

  return (
    <AppShell header={{ height: 80 }} padding='md'>
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Flex direction='row' w='100%' align='center' justify='space-between'>
            <img src='/logo.png' alt='logo' height={80} width={480} />
            <SigninButton />
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
