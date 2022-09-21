import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import type { WithPageAuthRequiredProps } from '@auth0/nextjs-auth0';
import type { NextPageContext } from 'next';

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

type BoardQueryResponse = WithPageAuthRequiredProps & {
  name: string
};
type BoardsProps = {
  boards: BoardQueryResponse[]
}

export const getServerSideProps: WithPageAuthRequiredProps = withPageAuthRequired({
  returnTo: '/',
  async getServerSideProps(ctx: NextPageContext) {
    const { user: { email } } = getSession(ctx.req);
    const prisma = new PrismaClient();
    const boards: BoardQueryResponse[] = await prisma.board.findMany({
      select: {
        name: true,
      },
      where: {
        members: {
          every: {
            member: {
              email,
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
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
          </TableHead>
          <TableBody>
            {boards.map((board: BoardQueryResponse, index: number) => (
              <TableRow>
                <TableCell component="th" scope="row">{index}</TableCell>
                <TableCell>{board.name}</TableCell>
              </TableRow>
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