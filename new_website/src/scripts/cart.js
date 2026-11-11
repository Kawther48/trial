const CART_KEY = "comfy-cart";

export function readCart() {
	const stored = localStorage.getItem(CART_KEY);
	if (!stored) return [];

	const cart = JSON.parse(stored);
	if (!Array.isArray(cart)) throw new Error("Saved bag data is invalid.");

	for (const item of cart) {
		if (
			typeof item.slug !== "string" ||
			typeof item.size !== "string" ||
			!Number.isInteger(item.quantity) ||
			item.quantity < 1
		) {
			throw new Error("Saved bag item is invalid.");
		}
	}

	return cart;
}

export function cartCount() {
	return readCart().reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(slug, size) {
	const cart = readCart();
	const existingItem = cart.find((item) => item.slug === slug && item.size === size);

	if (existingItem) existingItem.quantity += 1;
	else cart.push({ slug, size, quantity: 1 });

	localStorage.setItem(CART_KEY, JSON.stringify(cart));
	return cart.reduce((total, item) => total + item.quantity, 0);
}

export function removeFromCart(slug, size) {
	const cart = readCart().filter((item) => item.slug !== slug || item.size !== size);
	localStorage.setItem(CART_KEY, JSON.stringify(cart));
	return cart;
}

export function updateCartQuantity(slug, size, quantity) {
	const cart = readCart();
	const item = cart.find((entry) => entry.slug === slug && entry.size === size);
	if (!item) throw new Error("Bag item could not be found.");

	if (quantity < 1) return removeFromCart(slug, size);
	item.quantity = quantity;
	localStorage.setItem(CART_KEY, JSON.stringify(cart));
	return cart;
}
