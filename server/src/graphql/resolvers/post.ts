import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const postQueries = {
  posts: async () => {
    const items = await prisma.posts.findMany();
    return { items };
  },
  post: (_: unknown, { id }: { id: string }) => {
    return prisma.posts.findUnique({ where: { id: parseInt(id) } });
  },
};

export const postMutations = {
  createPost: async (
    _: unknown,
    { input }: { input: Prisma.PostsCreateInput },
  ) => {
    await prisma.posts.create({ data: input });
    return null;
  },
  deletePost: async (_: unknown, { id }: { id: string }) => {
    await prisma.posts.delete({ where: { id: parseInt(id) } });
    return null;
  },
};
