import { PUBLIC_API_URL } from '$env/static/public';

export async function authenticate(username: string, password: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: username,
      password: password,
    }),
  });

  if(reply.status === 400) throw Error(reply.statusText);
  const data = await reply.json();
  return data;
}