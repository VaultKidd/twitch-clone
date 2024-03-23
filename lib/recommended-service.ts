import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users: ({
    stream: {
      id: string;
      name: string;
      thumbnailUrl: string | null;
      ingressId: string | null;
      serverUrl: string | null;
      streamKey: string | null;
      isLive: boolean;
      isChatEnabled: boolean;
      isChatDelayed: boolean;
      isChatFollowersOnly: boolean;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  } & {
    id: string;
    username: string;
    imageUrl: string;
    externalUserId: string;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
  })[] = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    const users = await db.user.findMany({
      include: {
        stream: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return users;
};
