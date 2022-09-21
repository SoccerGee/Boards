import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await getBoards(req, res);
  }
  else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}

const getBoards = async (req: NextApiRequest, res: NextApiResponse) => {
  const { memberEmail } : { memberEmail?: string } = req.query;

  if(memberEmail === null) {
    res.status(500).json({ message: 'Could not read member email.', success: false });
  }

  try {
    const memberBoards = await prisma.board.findMany({
      where: {
        members: {
          every: {
            member: {
              email: memberEmail,
            }
          }
        }
      },
      include: {
        members: true,
      }
    });
    return res.status(200).json({ ...memberBoards, success:true});
  } catch (error) {
    console.error('ERROR with GET Boards', error);
    return res.status(500).json({ error: 'Error with GET Boards', success: false});
  }
}