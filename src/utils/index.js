const time2str = timeStamp => {
  const date = new Date(timeStamp);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

export { time2str };
