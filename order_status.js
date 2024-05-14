Shopify.Checkout.OrderStatus.addContentBox(`tailboost`);

const newElement = document.createElement("div");
newElement.innerHTML = `
  <html>
  <h3>Special Announcement</h3>
  <p>This is a special promotion just for you!</p>
  </html>`;

newElement.className = "special-announcement";

const targetDiv = document.querySelector(".main");
if (targetDiv) {
  targetDiv.prepend(newElement);
} else {
  console.error('The div with class "main" was not found.');
}

async function add() {
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "text/html",
      credentials: "include",
    },
  };
  const response = await fetch(
    `https://staging-tintin.tailboost.ai/adrequest/?tailboost_app_id=tailboost_app_5d5a50a3-2&tailboost_user_id=tailboost_user_34f10379-d31c-4&user_agent=Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/120.0.0.0%20Safari/537.36`,
    options
  );
  const data = await response.json();
  return data;
}

add();


