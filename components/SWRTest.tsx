import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SWRTest = () => {
  const { data, error } = useSWR("http://localhost:3000/api/upload", fetcher);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
};

export default SWRTest;
