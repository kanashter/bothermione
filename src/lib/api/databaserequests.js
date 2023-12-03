function generateUrl(u, p) {
  let username = encodeURIComponent(u);
  let password = encodeURIComponent(p);
  let urls = [
    `https://bothermione1-f022215ff2d8.herokuapp.com?username=${username}&password=${password}`,
    `https://bothermione2-99d15e6771bd.herokuapp.com?username=${username}&password=${password}`,
    `https://bothermione3-3c6927e98ea1.herokuapp.com?username=${username}&password=${password}`,
    `https://bothermione4-f212ce5f26f5.herokuapp.com?username=${username}&password=${password}`,
    `https://bothermione5-13213c5a7fa1.herokuapp.com?username=${username}&password=${password}`,
  ];
  return urls[Math.floor(Math.random() * urls.length)];
}
export async function getWrapped(username, password) {
  let url = generateUrl(username, password);
  let request = await fetch(url, {
    method: "get",
  });
  let d = await request.json();
  return d;
}
