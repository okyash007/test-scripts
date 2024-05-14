console.log(window);

async function fetchIpAddress() {
  const data = await fetch("https://api64.ipify.org?format=json");
  const res = await data.json();
  console.log(res);
  return res;
}

async function hit() {
  const ipData = await fetchIpAddress();
  const data = await fetch(
    window.location.origin +
      "/apps/proxy/?shop=" +
      window.location.host +
      "&ip=" +
      ipData.ip +
      "&current_url=" +
      window.location.href
  );
  console.log(data);
}

hit();
