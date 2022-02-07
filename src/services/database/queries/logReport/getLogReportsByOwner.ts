import { LogReport } from "@prisma/client";
import prisma from "@services/database/prismaClient";

const getLogReportsByOwner = async (uid: string): Promise<LogReport[]> => {
    return await prisma.logReport.findMany({
        where: {
            owner: uid,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export default getLogReportsByOwner;
