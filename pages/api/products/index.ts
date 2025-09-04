import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email)
    return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const products = await prisma.product.findMany({
      where: { userId: user.id },
    });
    return res.status(200).json(products);
  } else if (req.method === "POST") {
    const { name, price, quantity, category } = req.body;
    if (!name || price == null || quantity == null || !category) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const product = await prisma.product.create({
      data: { name, price, quantity, category, userId: user.id },
    });
    return res.status(201).json(product);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
