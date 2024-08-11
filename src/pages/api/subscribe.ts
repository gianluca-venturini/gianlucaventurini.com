import mailchimp from '@mailchimp/mailchimp_marketing';
import type { NextApiRequest, NextApiResponse } from 'next';

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { email } = req.body;
    console.log(req.body);
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
    }

    if (!audienceId) {
        res.status(500).json({ error: 'Mailchimp audience ID is not set' });
        return;
    }

    try {
        const response = await mailchimp.lists.addListMember(audienceId, {
            email_address: email,
            status: 'subscribed',
        });

        console.log(JSON.stringify(response));

        if (response.status !== 'subscribed') {
            res.status(500).json({
                error: 'Error subscribing to the newsletter.',
            });
            return;
        }

        res.status(201).json({ message: 'Subscription successful.' });
    } catch (error) {
        if (isKnownErrorResponse(error)) {
            if (error.response.body.title === 'Member Exists') {
                res.status(400).json({
                    error: 'You are already subscribed to the newsletter.',
                });
                return;
            }
            res.status(400).json({
                error: error.response.body.title ?? 'Internal Server Error',
            });
            return;
        }
        res.status(500).json({
            error: (error as any).message ?? 'Internal Server Error',
        });
    }
}

/** Attempt to recognize a well known mailchimp error. */
function isKnownErrorResponse(
    error: any
): error is { response: { body: mailchimp.ErrorResponse } } {
    return error?.response?.status !== 200;
}
