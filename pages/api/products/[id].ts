import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

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

  const { id } = req.query;
  if (typeof id !== "string")
    return res.status(400).json({ error: "Invalid ID" });

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  if (!product || product.userId !== user.id)
    return res.status(404).json({ error: "Not found" });

  if (req.method === "GET") {
    return res.status(200).json(product);
  } else if (req.method === "PUT") {
    const { name, price, quantity, category } = req.body;
    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, quantity, category },
    });
    return res.status(200).json(updated);
  } else if (req.method === "DELETE") {
    await prisma.product.delete({ where: { id: Number(id) } });
    return res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
