import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';

import Layout from '../../components/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { ParsedUrlQuery } from 'querystring';

type BoardQueryResponse = {
  name: string,
  id: number
};

type BoardProps = {
  board: BoardQueryResponse,
}

interface BoardParams extends ParsedUrlQuery {
  boardId: string,
};

export const getServerSideProps = withPageAuthRequired({
  returnTo: '/',
  async getServerSideProps({ params }) {
    const { boardId = 0 } = params as BoardParams;

    // fail gracefully
    if (!boardId) { return {props: { board: null } } };

    const prisma = new PrismaClient();
    const board = await prisma.board.findFirst({
      select: {
        name: true,
        id: true,
      },
      where: {
        id: +boardId,
      },
    });
    return { props: { board } }
  }
});

const Page: NextPageWithLayout<BoardProps> = (props) => {
  const { board } = props;
  return (
    <h2>You&apos;re looking at a really dope Board named: {board.name}</h2>
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