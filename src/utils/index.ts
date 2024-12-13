export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDate(date: Date | string) {
  const d = new Date(date);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul", // 시간대 고정
  }).format(d);
}
