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

  if (!reply.ok) throw Error(reply.statusText);
  const data = await reply.json();
  return data;
}

export async function getOwnUser(bearerToken: string) {
  const reply = await fetch(`${PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    },
  })

  if (!reply.ok) throw Error(reply.statusText);
  const data = await reply.json();
  return data;
}