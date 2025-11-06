"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Anchor, ScrollArea, Table } from "@mantine/core";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const UsersTable: React.FC<{ users: User[] }> = ({ users }) => {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => {
          const row = info.row.original;
          return (
            <Anchor component={Link} href={`/users/${row.id}`} underline="hover">
              {row.name}
            </Anchor>
          );
        },
      },
      { header: "Email", accessorKey: "email" },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: (info) => dayjs(String(info.getValue())).format("YYYY-MM-DD HH:mm"),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea>
      <Table striped highlightOnHover>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default UsersTable;
