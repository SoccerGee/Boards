import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';

import Layout from '../../components/Layout';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import Link from 'next/link';

type BoardQueryResponse = {
  name: string,
  id: number
};
type BoardsProps = {
  boards: BoardQueryResponse[]
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
      const prisma = new PrismaClient();
      const boards = await prisma.board.findMany({
        select: {
          name: true,
          id: true,
        },
        where: {
          members: {
            some: {
              member: {
                email: session?.user.email,
              },
            },
          },
        },
      });
    return { props: { boards } }
  }
});

const Page: NextPageWithLayout<BoardsProps> = (props) => {
  const boards = props.boards;
  return (
    <Container maxWidth="sm">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head">#</TableCell>
              <TableCell variant="head">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boards.map((board: BoardQueryResponse, index: number) => (
              <Link href={`/b/${board.id}`} passHref  key={board.name}>
                <TableRow>
                  <TableCell scope="row">{index}</TableCell>
                  <TableCell>{board.name}</TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page;
