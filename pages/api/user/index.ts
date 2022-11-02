import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

interface newUserBody {
  email: string,
  name: string
}

const handleNewUser = async (email: string) => {
  const prisma = new PrismaClient();
  const createMemberResponse = await prisma.member.create({
    data: {
      email,
    },
  });
  return createMemberResponse;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body as newUserBody;
    if (email) {
      const newUser = await handleNewUser(email);
      res.status(200).send({ data: newUser });
    } else {
      return res.status(500).send({ error: "No email found on the create user request..." })
    }
  }
}
