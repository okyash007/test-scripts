Shopify.Checkout.OrderStatus.addContentBox(`tailboost`);

const newElement = document.createElement("div");
newElement.innerHTML =
  "<h3>Special Announcement</h3><p>This is a special promotion just for you!</p>";
newElement.className = "special-announcement";

const targetDiv = document.querySelector(".main");
if (targetDiv) {
  targetDiv.appendChild(newElement);
} else {
  console.error('The div with class "main" was not found.');
}
