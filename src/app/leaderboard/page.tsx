export const dynamic = "force-dynamic";


import LeaderBoard from '@/components/LeaderBoard';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';


async function getUserDetail() {
  try {
    return await prisma.user.findMany({
      orderBy: { totalScore: 'desc' },
      take: 15,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export default async function LeaderBoardPage() {
  let users: User[] | null = [];
  try {
    users = await getUserDetail();
  } catch (error) {
    console.error('Error in LeaderBoardPage:', error);
  }

  return (
    <div>
      {users.length > 0 ? (
        <LeaderBoard users={users} />
      ) : (
        <p className="text-center text-red-500 mt-10">
          Unable to load leaderboard. Please try again later.
        </p>
      )}
    </div>
  );
}
