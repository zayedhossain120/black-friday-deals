export const getRandomColor = () => {
  const r1 = Math.random() * 200;
  const g1 = Math.random() * 200;
  const b1 = Math.random() * 200;
  const r2 = Math.random() * 200;
  const g2 = Math.random() * 200;
  const b2 = Math.random() * 200;

  const color1 = `rgba(${r1},${g1},${b1},0.5)`;
  const color2 = `rgba(${r2},${g2},${b2},0.5)`;

  return `linear-gradient(45deg, ${color1}, ${color2})`;
};
