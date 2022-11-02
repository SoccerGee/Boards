import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

interface newUserBody {
  email: string,
  name: string
}

const handleNewUser = async (email: string) => {
  console.log(`handling the creation of user: ${email}`);
  try {
    const prisma = new PrismaClient();
    const createMemberResponse = await prisma.member.create({
      data: {
        email,
      },
    });
    return createMemberResponse;
  } catch (err) {
    throw(err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(`recieved request: ${JSON.stringify(req.body)}`)
    const { email } = req.body as newUserBody;
    if (email) {
      try {
        const data = await handleNewUser(email);
        res.status(200).send({ data });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      return res.status(500).send({ error: "No email found on the create user request..." })
    }
  }
}
