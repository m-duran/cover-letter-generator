import Head from "next/head";
import { useState, FormEvent } from "react";
import styles from "./index.module.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function Home() {
  const [roleInput, setRoleInput] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: roleInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setRoleInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <IconContext.Provider value={{ size: "6em", className: "icon" }}>
          <div>
            <IoDocumentTextOutline />
          </div>
        </IconContext.Provider>
        <h3>Generate Cover Letter</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="role"
            placeholder="Enter a role"
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
          />
          <input type="submit" value="Generate cover letter" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
