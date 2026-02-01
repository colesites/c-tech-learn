export function ngnToUsd(ngn: number, rate: number) {
    if (!rate || rate <= 0) return 0;
    return Number((ngn / rate).toFixed(2)); // 2dp
}

export function formatMoney(amount: number, currency: "NGN" | "USD") {
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "NGN" ? 0 : 2,
    }).format(amount);
}
