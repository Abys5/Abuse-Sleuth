import { setCookies } from "cookies-next";
import dayjs from "dayjs";

import { StytchClient } from "@abuse-sleuth/auth";
import { prisma } from "@abuse-sleuth/prisma";

import getHandler from "@libs/api/handler";
import { createUser } from "@libs/database/user/createUser";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

const handler = getHandler();

handler.post(async (req, res) => {
    const token: string = req.body.token;

    try {
        const magicLinkRes = await StytchClient.magicLinks.authenticate(token, {
            session_duration_minutes: 60 * 24 * 7,
        });

        const user = await StytchClient.users.get(magicLinkRes.session.user_id);

        await createUser(magicLinkRes.user_id, user.emails[0].email);

        // Set the Cookie after the user has been authenticated and precheck have ran.
        setCookies("token", magicLinkRes.session_jwt, {
            req,
            res,
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: dayjs().add(7, "day").toDate(),
        });

        return res.status(200).send({
            ok: true,
            data: "Authenticated",
        });
    } catch (error) {
        return res.status(400).send({
            ok: false,
            error: error.error_message || error || "Failed to authenticate.",
        });
    }
});

export default handler;