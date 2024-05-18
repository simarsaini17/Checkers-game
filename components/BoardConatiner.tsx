interface BoardConatiner {
  children: React.ReactNode;
}

export const BoardConatiner = ({ children }: BoardConatiner) => {
  return <div className="grid grid-cols-8 content-center">{children}</div>;
};
