Shopify.Checkout.OrderStatus.addContentBox(`tailboost`);

// const newElement = document.createElement("div");
// newElement.innerHTML = `
//   <html>
//   <h3>Special Announcement</h3>
//   <p>This is a special promotion just for you!</p>
//   </html>`;

// newElement.className = "special-announcement";

// const targetDiv = document.querySelector(".main");
// if (targetDiv) {
//   targetDiv.prepend(newElement);
// } else {
//   console.error('The div with class "main" was not found.');
// }

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

  const tailboostElement = document.createElement("div");

  tailboostElement.innerHTML = await data.text();

  tailboostElement.className = "special-announcement-2";

  const targetDiv = document.querySelector(".main");
  if (targetDiv) {
    targetDiv.prepend(tailboostElement);
  } else {
    console.error('The div with class "main" was not found.');
  }
}

hit();



