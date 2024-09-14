import { useRef } from 'react';

export const SubscribeForm = () => {
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;

        const res = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            alert('Subscription successful!');
        } else {
            try {
                const body = await res.json();
                alert(body?.error);
            } catch (error) {
                console.error(error);
                alert('Error subscribing.');
            }
        }
    };

    return (
        <form
            className="flex gap-4 py-4 border-b dark:border-gray-700"
            style={{
                paddingBottom: '1rem',
            }}
            onSubmit={(e) => {
                void handleSubscribe(e);
            }}
        >
            <input
                className="px-4 min-w-10"
                type="email"
                id="email"
                ref={emailRef}
                placeholder="mario@gmail.com"
                required
            />
            <button type="submit">Subscribe</button>
        </form>
    );
};
