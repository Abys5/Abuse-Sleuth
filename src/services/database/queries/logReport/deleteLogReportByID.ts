import { LogReport } from "@prisma/client";
import prisma from "@services/database/prismaClient";

const deleteLogReportByID = async (id: number): Promise<LogReport> => {
    return await prisma.logReport.delete({
        where: {
            id,
        },
    });
};

export default deleteLogReportByID;
