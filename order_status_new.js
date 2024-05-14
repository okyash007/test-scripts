async function hit() {
  const data = await fetch(
    window.location.origin +
      "/apps/proxy/?shop=" +
      window.location.host +
      "&ip=" +
      ipData.ip +
      "&current_url=" +
      window.location.href,
    {
      headers: {
        Accept: "text/html",
      },
    }
  );

  const newElement = document.createElement("div");

  newElement.innerHTML = await data.text();

  newElement.className = "special-announcement-2";

  const targetDiv = document.querySelector(".main");
  if (targetDiv) {
    targetDiv.prepend(newElement);
  } else {
    console.error('The div with class "main" was not found.');
  }
}

hit();
